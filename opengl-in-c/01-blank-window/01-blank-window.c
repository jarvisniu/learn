
#include <stdio.h>
#include <GL/glew.h>
#include "GLUT/glut.h"

static void render(void) {
  glClearColor(0.0f, 0.0f, 0.0f, 1.0f);
  glClear(GL_COLOR_BUFFER_BIT);
  glutSwapBuffers();
}

int main(int argc, char** argv) {
  // init glut
  glutInit(&argc, argv);
  // Set double buffer, color mode
  glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGBA);
  // Set window position, size, title
  glutInitWindowSize(800, 600);
  glutInitWindowPosition(200, 100);
  glutCreateWindow("01.Blank Window");
  glutDisplayFunc(&render); // Set render callback function
  glutMainLoop(); // Run the main loop
  return 0;
}
