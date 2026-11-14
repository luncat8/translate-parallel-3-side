import json
import re
import shutil
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SONGS = ROOT / "songs"
META_LIST = re.compile(r"^\s*columns:\s*(\[[^\]]*\])", re.M)
META_MAP = re.compile(r"^\s*(columnTitles|columnNames):\s*(\{[^}]*\})", re.M)
META_KEY = re.compile(r'^\s*(sourceKey|translitKey):\s*"([a-z]+)"', re.M)
JP_CELL = re.compile(r'jp: "((?:[^"\\]|\\.)*)"')
TOPIC_TAIL = re.compile(r"[、。！？!?…」』）)\]　 ]+$")
REQUIRED = [
	"song.json",
	"sources/source.ja.txt",
	"sources/source.tr.txt",
	"sources/fixation.json",
	"sources/expected-translation.en.txt",
	"sources/expected-translation.ru.txt",
	"map/song-data.js",
	"result.html",
	"worklog.md",
	"qa/.gitkeep"
]


def run(*args):
	return subprocess.run(
		[sys.executable, "tools/song.py", *args],
		cwd=ROOT, capture_output=True, text=True)


def map_meta(map_path):
	text = map_path.read_text(encoding="utf-8")
	keys = dict(META_KEY.findall(text))
	tables = {}
	for name, body in META_MAP.findall(text):
		body = re.sub(r'(\w+):', r'"\1":', body)
		tables[name] = json.loads(body)
	return {
		"columns": json.loads(META_LIST.search(text).group(1)),
		"source": keys.get("sourceKey", "jp"),
		"transliteration": keys.get("translitKey", "tr"),
		"titles": tables["columnTitles"],
		"names": tables["columnNames"],
	}


class SongLayoutTests(unittest.TestCase):
	def test_every_song_has_the_folder_contract(self):
		manifests = sorted(SONGS.glob("*/song.json"))
		self.assertTrue(manifests)
		for manifest in manifests:
			song_dir = manifest.parent
			cfg = json.loads(manifest.read_text(encoding="utf-8"))
			self.assertEqual(cfg["id"], song_dir.name)
			for rel in REQUIRED:
				with self.subTest(song=cfg["id"], path=rel):
					self.assertTrue((song_dir / rel).is_file())

	def test_columns_lead_with_the_source_then_its_mirror(self):
		for manifest in sorted(SONGS.glob("*/song.json")):
			map_path = manifest.parent / "map/song-data.js"
			meta = map_meta(map_path)
			cfg = json.loads(manifest.read_text(encoding="utf-8"))
			with self.subTest(song=cfg["id"]):
				self.assertEqual(meta["columns"][0], meta["source"])
				self.assertEqual(meta["columns"][1], meta["transliteration"])
				self.assertEqual(cfg["columns"], meta["columns"])
				for lang in meta["columns"]:
					self.assertEqual(meta["titles"][lang], lang, "labels are the 2-letter codes")
					self.assertTrue(meta["names"][lang], "every column has a full name")

	def test_topic_marks_sit_on_the_topic_particle(self):
		for map_path in sorted(SONGS.glob("*/map/song-data.js")):
			for line in map_path.read_text(encoding="utf-8").split("\n"):
				cell = JP_CELL.search(line)
				if not cell:
					continue
				topic = TOPIC_TAIL.sub("", cell.group(1)).endswith("は")
				with self.subTest(song=map_path.parent.parent.name, line=line.strip()[:60]):
					self.assertEqual(topic, "topic: true" in line)

	def test_check_all(self):
		result = run("check", "--all")
		self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

	def test_zz_new_song_workflow(self):
		song_id = "workflow-fixture"
		song_dir = SONGS / song_id
		if song_dir.exists():
			shutil.rmtree(song_dir)
		try:
			with tempfile.TemporaryDirectory() as tmp:
				source = Path(tmp) / "song.tsv"
				russian = Path(tmp) / "ru.txt"
				source.write_text(
					"Japanese\tRomaji\tEnglish\n"
					"好きなことだけ\tsuki na koto dake\tOnly what I like\n"
					"\n"
					"いいです\tii desu\tIt is enough\n",
					encoding="utf-8")
				russian.write_text(
					"Лишь то, что люблю\n\nИ этого хватит\n",
					encoding="utf-8")
				result = run(
					"new", "--song", song_id, "--title", "Workflow fixture",
					"--source", str(source), "--expected-ru", str(russian))
				self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
				for rel in REQUIRED:
					with self.subTest(path=rel):
						self.assertTrue((song_dir / rel).is_file())
				result = run("check", "--song", song_id)
				self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
		finally:
			if song_dir.exists():
				shutil.rmtree(song_dir)


if __name__ == "__main__":
	unittest.main()
