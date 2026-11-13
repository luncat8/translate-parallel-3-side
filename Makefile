PYTHON ?= python3

.PHONY: build check test new

build:
	$(PYTHON) tools/song.py build --all

check: build
	$(PYTHON) tools/song.py check --all
	$(PYTHON) -m unittest discover -s tests -v

test: check

new:
	@test -n "$(id)" || (echo "usage: make new id=my-song title='My song' source=/path/song.tsv [ru=/path/ru.txt]"; exit 1)
	$(PYTHON) tools/song.py new --song "$(id)" --title "$(title)" --source "$(source)" $(if $(ru),--expected-ru "$(ru)",)
