# lwjgl

> Java 3D framework, short for Lightweight Java Game Library

## Links

Homepage: https://www.lwjgl.org/
Docs: https://www.lwjgl.org/guide
GitHub: https://github.com/LWJGL/lwjgl3

## Run

> NOTE: You need to download the *.jar files from https://www.lwjgl.org/customize
and extract them into the `/lwjgl/lib/` directory.

```sh
cd 01_hello
# compile
javac -cp "../lib/*" src/Main.java
# run (on macOS)
java -XstartOnFirstThread -cp "src:../lib/*" Main
# run (on Windows)
java -cp "src;../lib/*" Main
```
