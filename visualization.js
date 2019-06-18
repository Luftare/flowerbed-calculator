function visualizeTiles(tileDimensions, tileCounts, tileGap) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = canvas.width;

  const maxSide = Math.max(tileDimensions.x, tileDimensions.y);
  const minSide = Math.min(tileDimensions.x, tileDimensions.y);

  const totalDimensions = {
    x: (maxSide + tileGap) * tileCounts.x + minSide,
    y: (maxSide + tileGap) * tileCounts.y + minSide,
  };

  const maxDimension = Math.max(totalDimensions.x, totalDimensions.y);
  const scale = (canvas.clientWidth / maxDimension) * 0.8;

  const maxScreenSide = maxSide * scale;
  const minScreenSide = minSide * scale;

  const screenTileGap = tileGap * scale;
  const colors = ['#174a6b', '#2C618A'];

  const gapZ = 5;
  const maxX = tileCounts.x * (maxScreenSide + screenTileGap) + minScreenSide + screenTileGap;
  const maxY = tileCounts.y * (maxScreenSide + screenTileGap) + minScreenSide;

  for (let i = tileCounts.z; i > 0; i--) {
    ctx.strokeStyle = '#174a6b';
    const x = i * gapZ;
    const y = i * gapZ + maxY;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.rect(x, y, maxX, -totalDimensions.y * scale);
    ctx.closePath();
    ctx.stroke();
  }

  ctx.globalAlpha = 1;

  for (let i = 0; i < tileCounts.x; i++) {
    const x = i * (maxScreenSide + screenTileGap);
    const y = 0;
    ctx.fillStyle = colors[i % 2];
    ctx.fillRect(x, y, maxScreenSide, minScreenSide);
  }

  for (let i = 0; i < tileCounts.x; i++) {
    const x = i * (maxScreenSide + screenTileGap) + minScreenSide + screenTileGap;
    const y = tileCounts.y * (maxScreenSide + screenTileGap);
    ctx.fillStyle = colors[i % 2];
    ctx.fillRect(x, y, maxScreenSide, minScreenSide);
  }

  for (let i = 0; i < tileCounts.y; i++) {
    const x = 0;
    const y = minScreenSide + screenTileGap + i * (maxScreenSide + screenTileGap);
    ctx.fillStyle = colors[(i + 1) % 2];
    ctx.fillRect(x, y, minScreenSide, maxScreenSide);
  }

  for (let i = 0; i < tileCounts.y; i++) {
    const x = tileCounts.x * (maxScreenSide + screenTileGap);
    const y = i * (maxScreenSide + screenTileGap);
    const colorIndex = tileCounts.x % 2 ? (i + 1) % 2 : i % 2;
    ctx.fillStyle = colors[colorIndex];
    ctx.fillRect(x, y, minScreenSide, maxScreenSide);
  }
}