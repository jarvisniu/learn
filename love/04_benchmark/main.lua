width = 640
height = 480

function love.load()
  -- success = love.window.setMode( 1600, 900, {
  --   fullscreen = true,
  -- } )
end

-- 线段
function love.draw2()
  for i = 1, 2e4 do
    love.graphics.setColor(math.random(), math.random(), math.random())
    love.graphics.line(
      width * math.random(), height * math.random(),
      width * math.random(), height * math.random()
    )
  end
  love.graphics.setColor(1, 1, 1)
  love.graphics.print("FPS: "..tostring(love.timer.getFPS()), 10, 10)
end

-- 三角形
function love.draw2()
  for i = 1, 2e4 do
    love.graphics.setColor(math.random(), math.random(), math.random())
    love.graphics.polygon('fill',
      width * math.random(), height * math.random(),
      width * math.random(), height * math.random(),
      width * math.random(), height * math.random()
    )
  end
  love.graphics.setColor(1, 1, 1)
  love.graphics.print("FPS: "..tostring(love.timer.getFPS()), 10, 10)
end

-- 圆
function love.draw()
  for i = 1, 1e5 do
    love.graphics.setColor(math.random(), math.random(), math.random())
    love.graphics.circle('fill',
      width * math.random(), height * math.random(),
      50
    )
  end
  love.graphics.setColor(1, 1, 1)
  love.graphics.print("FPS: "..tostring(love.timer.getFPS()), 10, 10)
end

-- 文字
function love.draw2()
  for i = 1, 1e5 do
    love.graphics.setColor(math.random(), math.random(), math.random())
    love.graphics.print(
      "Hello",
      width * math.random(),
      height * math.random()
    )
  end
  love.graphics.setColor(1, 1, 1)
  love.graphics.print("FPS: "..tostring(love.timer.getFPS()), 10, 10)
end
