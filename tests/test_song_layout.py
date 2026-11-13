import json
import shutil
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SONGS = ROOT / "songs"
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
