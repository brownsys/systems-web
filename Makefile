.PHONY: serve

BUNDLE := $(shell which bundle)

all: build

build:
	${BUNDLE} exec jekyll build

serve:
	${BUNDLE} exec jekyll serve

clean:
	${BUNDLE} exec jekyll clean
