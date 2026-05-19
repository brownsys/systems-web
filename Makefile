OUTPUT_DIR = site

COPY_SRC = assets index.html papers people projects publications sysread sysread-archive news

.PHONY: build serve

all: build

build: static

static:
	mkdir -pv $(OUTPUT_DIR)
	cp -pRv $(COPY_SRC) $(OUTPUT_DIR)/

serve:
	./serve-local.sh

clean:
	rm -rf $(OUTPUT_DIR)
