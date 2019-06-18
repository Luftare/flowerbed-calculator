function parse3dVector({ x, y, z }) {
  return {
    x: parseFloat(x),
    y: parseFloat(y),
    z: parseFloat(z),
  }
}

const app = new Vue({
  el: '#root',
  data: {
    targetDimensions: {
      x: 2000,
      y: 1000,
      z: 800
    },
    tileDimensions: {
      x: 350,
      y: 200,
      z: 150
    },
    tileGap: 5,
    tilePrice: 3
  },
  computed: {
    parsedTilePrice() {
      return Math.floor(10 * parseFloat((this.tilePrice + '').split(',').join('.'))) / 10;
    },
    totalPrice() {
      return this.parsedTilePrice * this.totalTiles;
    },
    parsedTargetDimensions() {
      return parse3dVector(this.targetDimensions);
    },
    parsedTileDimensions() {
      return parse3dVector(this.tileDimensions);
    },
    parsedTileGap() {
      return parseFloat(this.tileGap) || 0;
    },
    maxSideWidth() {
      return Math.max(this.parsedTileDimensions.x, this.parsedTileDimensions.y);
    },
    minSideWidth() {
      return Math.min(this.parsedTileDimensions.x, this.tileDimensions.y);
    },
    enclosedTileCounts() {
      return {
        x: Math.floor((this.parsedTargetDimensions.x - 0.5 * this.minSideWidth) / (this.maxSideWidth + this.parsedTileGap)),
        y: Math.floor((this.parsedTargetDimensions.y - 0.5 * this.minSideWidth) / (this.maxSideWidth + this.parsedTileGap)),
        z: Math.floor(this.parsedTargetDimensions.z / (this.parsedTileDimensions.z + this.parsedTileGap))
      };
    },
    enclosedTotalDimensions() {
      return {
        x: this.enclosedTileCounts.x * (this.maxSideWidth + this.parsedTileGap) + 0.5 * this.minSideWidth,
        y: this.enclosedTileCounts.y * (this.maxSideWidth + this.parsedTileGap) + 0.5 * this.minSideWidth,
        z: (this.parsedTileDimensions.z + this.parsedTileGap) * this.enclosedTileCounts.z - this.parsedTileGap
      }
    },
    totalTiles() {
      return (this.enclosedTileCounts.x * 2 + this.enclosedTileCounts.y * 2) * this.enclosedTileCounts.z;
    }
  },
  methods: {
    repaint() {
      try {
        visualizeTiles(this.parsedTileDimensions, this.enclosedTileCounts, this.parsedTileGap);
      } catch (e) { }
    }
  },
  mounted() {
    this.repaint();
  }
})