function love.load()
  google = love.graphics.newImage("google.png")
end

function love.draw()
  -- text
  love.graphics.print("Text!", 400, 300)
  -- line
  love.graphics.line(10, 10, 100, 10)
  -- circle fill
  love.graphics.circle('fill', 50, 50, 30)
  -- circle line
  love.graphics.circle('line', 50, 100, 30)
  -- rectangle
  love.graphics.rectangle('fill', 10, 120, 50, 40)
  -- image
  love.graphics.draw(google, 10, 180)
end
