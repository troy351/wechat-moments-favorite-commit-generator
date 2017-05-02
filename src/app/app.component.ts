import {Component} from '@angular/core';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  step: number;
  config: {
    width: number, height: number, devicePixelRatio: number,
    header: number, fontSize: number, lineHeight: number,
    commaSize: number, commaGutterBefore: number, commaGutterAfter: number,
    gutterHeight: number, gutterFontSize: number, gutterMarginTop: number,
    areaWidth: number, areaMarginLeft: number, areaMarginTop: number, areaMarginRight: number, areaMarginBottom: number,
    areaPaddingLeft: number, areaPaddingRight: number, areaPaddingTop: number, areaPaddingBottom: number,
    areaTriangleLeft: number, areaTriangleWidth: number, areaTriangleHeight: number,
    areaHeartSrc: string, areaHeartWidth: number,
    areaSeparatorMarginTop: number, areaSeparatorOffsetBottom: number, areaSeparatorHeight: number, areaSeparatorColors: string[],
    favoriteOnlyPaddingBottom: number,
    commitOffsetLeft: number, commitLineHeight: number, commitFirstLineOffset: number, commitSpaceWidth: number,
    colonSize: number, colonGutterBefore: number, colonGutterAfter: number,
    replyText: string, replyGutterBefore: number, replyGutterAfter: number,
  };
  nextAccess: boolean;
  prevAccess: boolean;
  image: HTMLImageElement;
  favorites: {name: string}[];
  commits: {from: string, to: string, content: string}[];
  gutters: number[];
  gutterIndex: number;
  imageData: ImageData;
  currentBaseline: number;
  heartImage: HTMLImageElement;
  rendering: boolean;
  deviceType: number;
  language: number;
  isiPhone: boolean;

  constructor() {
    this.step = 0;
    this.nextAccess = true;
    this.prevAccess = false;
    this.favorites = [];
    this.commits = [];
    this.gutters = [];

    this.isiPhone = navigator.userAgent.indexOf('iPhone') > -1;
    this.language = 0;
  }

  prevStep(): void {
    this.step--;
    this.stepChecker();
  }

  nextStep(): void {
    this.step++;
    this.stepChecker();
  }

  stepChecker(): void {
    switch (this.step) {
      case 0:
        this.prevAccess = false;
        this.nextAccess = true;
        break;
      case 1:
        this.deviceSwitch();
        this.prevAccess = true;
        this.nextAccess = false;
        this.gutters = [];
        break;
      case 2:
        this.nextAccess = !isNullOrUndefined(this.gutterIndex);
        this.gutters = [];
        setTimeout(() => {
          this.renderImageGutter()
        }, 0);
        break;
      case 3:
        this.nextAccess = true;
        this.checkIfHasFavoriteAlready();
        break;
      case 4:
        this.nextAccess = false;
        this.rendering = true;
        setTimeout(() => {
          this.renderAreaBackground();
          this.renderFavorites();
          this.renderCommits();
          this.renderPatch();
        }, 0);
        break;
    }
  }

  deviceSwitch() {
    if (isNullOrUndefined(this.deviceType)) {
      alert('请选择一个设备');
      this.prevStep();
      return;
    }

    switch (this.deviceType) {
      case 0:
        this.config = {
          width: 640,
          height: 1136,
          devicePixelRatio: 2,
          header: 128,
          fontSize: 28,
          lineHeight: 34,
          commaSize: 33,
          commaGutterBefore: 2,
          commaGutterAfter: 15,
          gutterHeight: 1,
          gutterMarginTop: 32,
          gutterFontSize: 40,
          areaWidth: 500,
          areaMarginLeft: 122,
          areaMarginRight: 18,
          areaMarginTop: 26,
          areaMarginBottom: 30,
          areaPaddingLeft: 16,
          areaPaddingRight: 12,
          areaPaddingTop: 1,
          areaPaddingBottom: -33,
          areaTriangleLeft: 20,
          areaTriangleWidth: 24,
          areaTriangleHeight: 10,
          areaHeartSrc: './assets/heart@2x-small.png',
          areaHeartWidth: 42,
          areaSeparatorMarginTop: 15,
          areaSeparatorOffsetBottom: -13,
          areaSeparatorHeight: 2,
          areaSeparatorColors: ['#dddedf', '#f6f7f7'],
          favoriteOnlyPaddingBottom: 48,
          commitOffsetLeft: 0,
          commitFirstLineOffset: -2,
          commitLineHeight: 46,
          commitSpaceWidth: 8,
          colonSize: 30,
          colonGutterBefore: 1,
          colonGutterAfter: 8,
          replyText: '回复',
          replyGutterBefore: 1,
          replyGutterAfter: 2,
        };
        break;
      case 1:
        this.config = {
          width: 750,
          height: 1334,
          devicePixelRatio: 2,
          header: 128,
          fontSize: 28,
          lineHeight: 34,
          commaSize: 33,
          commaGutterBefore: 2,
          commaGutterAfter: 15,
          gutterHeight: 2,
          gutterMarginTop: 32,
          gutterFontSize: 40,
          areaWidth: 608,
          areaMarginLeft: 123,
          areaMarginRight: 19,
          areaMarginTop: 26,
          areaMarginBottom: 30,
          areaPaddingLeft: 20,
          areaPaddingRight: 12,
          areaPaddingTop: 1,
          areaPaddingBottom: -33,
          areaTriangleLeft: 20,
          areaTriangleWidth: 24,
          areaTriangleHeight: 10,
          areaHeartSrc: './assets/heart@2x.png',
          areaHeartWidth: 42,
          areaSeparatorMarginTop: 15,
          areaSeparatorOffsetBottom: -13,
          areaSeparatorHeight: 2,
          areaSeparatorColors: ['#dddedf', '#f6f7f7'],
          favoriteOnlyPaddingBottom: 48,
          commitOffsetLeft: 4,
          commitFirstLineOffset: -2,
          commitLineHeight: 46,
          commitSpaceWidth: 8,
          colonSize: 30,
          colonGutterBefore: 1,
          colonGutterAfter: 8,
          replyText: '回复',
          replyGutterBefore: 2,
          replyGutterAfter: 2,
        };
        break;
      case 2:
        this.config = {
          width: 1242,
          height: 2208,
          devicePixelRatio: 3,
          header: 192,
          fontSize: 42,
          lineHeight: 52,
          commaSize: 49,
          commaGutterBefore: 4,
          commaGutterAfter: 24,
          gutterHeight: 2,
          gutterMarginTop: 51,
          gutterFontSize: 60,
          areaWidth: 966,
          areaMarginLeft: 217,
          areaMarginRight: 59,
          areaMarginTop: 39,
          areaMarginBottom: 45,
          areaPaddingLeft: 27,
          areaPaddingRight: 22,
          areaPaddingTop: 2,
          areaPaddingBottom: -33,
          areaTriangleLeft: 30,
          areaTriangleWidth: 37,
          areaTriangleHeight: 15,
          areaHeartSrc: './assets/heart@3x.png',
          areaHeartWidth: 63,
          areaSeparatorMarginTop: 23,
          areaSeparatorOffsetBottom: -15,
          areaSeparatorHeight: 3,
          areaSeparatorColors: ['#dddedf', '#f6f7f7', '#f6f7f7'],
          favoriteOnlyPaddingBottom: 48,
          commitOffsetLeft: 0,
          commitFirstLineOffset: -2,
          commitLineHeight: 64,
          commitSpaceWidth: 12,
          colonSize: 45,
          colonGutterBefore: 1,
          colonGutterAfter: 8,
          replyText: '回复',
          replyGutterBefore: 2,
          replyGutterAfter: 2,
        };
        break;
    }

    if (this.language === 1) {
      switch (this.deviceType) {
        case 0:
          Object.assign(this.config, {
            replyText: '@',
            replyGutterBefore: 9,
            replyGutterAfter: 10,
          });
          break;
        case 1:
          Object.assign(this.config, {
            replyText: '@',
            replyGutterBefore: 9,
            replyGutterAfter: 10,
          });
          break;
        case 2:
          Object.assign(this.config, {
            replyText: '@',
            replyGutterBefore: 9,
            replyGutterAfter: 10,
          });
          break;
      }
    }

    // load heart image
    this.heartImage = document.createElement('img');
    this.heartImage.src = this.config.areaHeartSrc;
  }

  uploadImage(files: FileList): void {
    if (files.length === 0) {
      alert('请选择一个文件');
      return;
    }

    const imageFile: File = files[0];
    const reader: FileReader = new FileReader();

    reader.addEventListener('load', (file: ProgressEvent) => {
      this.image = new Image();
      this.image.src = (<FileReader>file.target).result;

      this.image.addEventListener('load', () => {
        if (this.image.width !== this.config.width || this.image.height !== this.config.height) {
          alert('请选择正确的屏幕截图文件');
          return;
        }
        this.nextAccess = true;
      });
    });

    reader.readAsDataURL(imageFile);
  }

  private renderImageGutter(): void {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('gutterCanvas');
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height);
    ctx.fillStyle = 'red';
    this.imageData = ctx.getImageData(0, 0, this.image.width, this.image.height);
    const imageData: ImageData = ctx.getImageData(0, 0, this.image.width, this.image.height);

    // find gutter and set to red
    for (let i = this.config.header; i < imageData.height - this.config.gutterHeight; i++) {
      const index = i * imageData.width * 4;
      if (Math.abs(imageData.data[index] - 255) > 3) {
        ctx.fillRect(0, i, this.config.width, this.config.gutterHeight);
        this.gutters.push(i);
        i += this.config.gutterHeight;
      }
    }

    if (this.gutters.length === 0) {
      alert('请确保存在朋友圈之间的分割线，尝试选择一个新的截图');
      this.prevStep();
      return;
    }

    if (this.gutters.length > 10) {
      alert('请选择有效的朋友圈截图');
      this.prevStep();
      return;
    }

    ctx.font = `${this.config.gutterFontSize}px -apple-system`;
    // draw gutter number
    this.gutters.forEach((n, i) => ctx.fillText((i + 1) + '', 10, n - 10));
  }

  private checkIfHasFavoriteAlready(): void {
    // const centerPoint: number = (this.gutters[this.gutterIndex] - this.config.gutterMarginTop + 0.5) * this.config.width * 4;
    // if (this.imageData[centerPoint] !== 255) {
    //   alert('该条朋友圈已经存在赞或评论，请选择一条不存在赞和评论的朋友圈进行操作');
    //   this.step = 2;
    // }
  }

  addFavorite(): void {
    this.favorites.push({name: ''});
  }

  removeFavorite(index): void {
    this.favorites.splice(index, 1);
  }

  addCommit(): void {
    this.commits.push({from: '', to: '', content: ''});
  }

  removeCommit(index): void {
    this.commits.splice(index, 1);
  }

  private renderAreaBackground(): void {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('renderCanvas');
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
    ctx.putImageData(this.imageData, 0, 0);

    // fill bottom with white
    ctx.fillStyle = 'white';
    ctx.fillRect(0, this.gutters[this.gutterIndex], this.config.width, this.config.height - this.gutters[this.gutterIndex]);

    this.currentBaseline = this.gutters[this.gutterIndex] - this.config.areaPaddingBottom - this.config.areaMarginBottom;

    this.favorites = this.favorites.filter(n => n.name);
    this.commits = this.commits.filter(n => n.from);
    if (this.favorites.length === 0 && this.commits.length === 0) return;

    /* draw triangle */
    ctx.fillStyle = '#f3f3f5';
    ctx.beginPath();
    // left point
    ctx.moveTo(this.config.areaMarginLeft + this.config.areaTriangleLeft,
      this.gutters[this.gutterIndex] - this.config.gutterMarginTop + this.config.areaMarginTop);
    // right point
    ctx.lineTo(this.config.areaMarginLeft + this.config.areaTriangleLeft + this.config.areaTriangleWidth,
      this.gutters[this.gutterIndex] - this.config.gutterMarginTop + this.config.areaMarginTop);
    // top point
    ctx.lineTo(this.config.areaMarginLeft + this.config.areaTriangleLeft + this.config.areaTriangleWidth / 2,
      this.gutters[this.gutterIndex] - this.config.gutterMarginTop + this.config.areaMarginTop - this.config.areaTriangleHeight);
    ctx.closePath();
    ctx.fill();

    /* draw background */
    ctx.fillRect(this.config.areaMarginLeft, this.gutters[this.gutterIndex] - this.config.gutterMarginTop + this.config.areaMarginTop,
      this.config.areaWidth, this.config.height - (this.gutters[this.gutterIndex] - this.config.gutterMarginTop + this.config.areaMarginTop))
  }

  private renderFavorites(): void {
    if (this.favorites.length === 0) return;

    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('renderCanvas');
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    const leftEdge = this.config.areaMarginLeft + this.config.areaPaddingLeft;
    const rightEdge = this.config.width - this.config.areaPaddingRight - this.config.areaMarginRight;
    let left = leftEdge + this.config.areaHeartWidth;
    this.currentBaseline = this.gutters[this.gutterIndex] - this.config.gutterMarginTop + this.config.areaMarginTop + this.config.areaPaddingTop + this.config.lineHeight;

    // draw heart
    ctx.drawImage(this.heartImage, this.config.areaMarginLeft, this.gutters[this.gutterIndex] - this.config.gutterMarginTop + this.config.areaMarginTop);

    // draw favorites
    this.favorites.forEach((item, index) => {
      if (item.name === '') return;

      ctx.fillStyle = '#586c93';
      ctx.font = `500 ${this.config.fontSize}px -apple-system`;

      // draw name/nickname
      for (let i = 0; i < item.name.length; i++) {
        // unicode character check, e.g. emoji
        const code: number = item.name.codePointAt(i);
        if (code > 0xffff) i++;
        const letter: string = String.fromCodePoint(code);

        // if the letter out of range (when it was the last letter, comma should also be in concerned), line wrap
        const measurement: TextMetrics = ctx.measureText(letter);
        if (left + measurement.width > rightEdge ||
          (i === item.name.length && left + measurement.width + this.config.fontSize + this.config.commaGutterBefore > rightEdge)) {
          left = leftEdge;
          this.currentBaseline += this.config.lineHeight;

          if (this.currentBaseline > this.config.height) {
            alert('所增加的赞数量过多，超出了屏幕显示范围，请适当减少');
            this.prevStep();
            return;
          }
        }

        ctx.fillText(letter, left, this.currentBaseline);
        left += measurement.width;
      }

      left += this.config.commaGutterBefore;

      // draw comma
      if (index < this.favorites.length - 1) {
        ctx.fillStyle = 'black';
        ctx.font = `${this.config.commaSize}px -apple-system`;
        ctx.fillText(',', left, this.currentBaseline);
        left += this.config.commaGutterAfter;
      }
    });
  }

  private renderCommits(): void {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('renderCanvas');
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    if (this.commits.length === 0) {
      this.currentBaseline = this.currentBaseline + this.config.favoriteOnlyPaddingBottom;
      return;
    }

    if (this.favorites.length !== 0) {
      // draw separator
      for (let i = 0; i < this.config.areaSeparatorHeight; i++) {
        ctx.fillStyle = this.config.areaSeparatorColors[i];
        ctx.fillRect(this.config.areaMarginLeft, this.currentBaseline + this.config.areaSeparatorMarginTop + i, this.config.areaWidth, 1);
      }

      this.currentBaseline += this.config.areaSeparatorHeight + this.config.areaSeparatorMarginTop + this.config.areaSeparatorOffsetBottom + this.config.commitLineHeight;
    } else {
      this.currentBaseline = this.gutters[this.gutterIndex] - this.config.gutterMarginTop + this.config.areaMarginTop + this.config.areaPaddingTop + this.config.lineHeight;
    }

    const leftEdge = this.config.areaMarginLeft + this.config.areaPaddingLeft - this.config.commitOffsetLeft;
    const rightEdge = this.config.width - this.config.areaPaddingRight - this.config.areaMarginRight;
    let left = leftEdge;

    const drawText = text => {
      for (let i = 0; i < text.length; i++) {
        // unicode character check, e.g. emoji
        const code: number = text.codePointAt(i);
        if (code > 0xffff) i++;
        const letter: string = String.fromCodePoint(code);

        // if the letter out of range (when letter after a punctuation mark, the mark should also be in concerned), line wrap
        const measurement: TextMetrics = ctx.measureText(letter);
        if (left + measurement.width > rightEdge ||
          ('！；：’”。，、!;:,.\'\"'.indexOf(text[i + 1]) !== -1 &&
          left + measurement.width + ctx.measureText(text[i + 1]).width > rightEdge)) {
          left = leftEdge;

          this.currentBaseline += this.config.lineHeight;

          if (this.currentBaseline > this.config.height) {
            alert('所增加的评论数量过多，超出了屏幕显示范围，请适当减少');
            this.prevStep();
            return;
          }
        }

        ctx.fillText(letter, left, this.currentBaseline);
        left += letter === ' ' ? this.config.commitSpaceWidth : measurement.width;
      }
    };

    // draw commits
    this.commits.forEach((item, index) => {
      if (item.from === '') return;

      ctx.fillStyle = '#586c93';
      ctx.font = `500 ${this.config.fontSize}px -apple-system`;
      drawText(item.from);

      if (item.to !== '') {
        left += this.config.replyGutterBefore;

        ctx.fillStyle = 'black';
        ctx.font = `${this.config.fontSize}px -apple-system`;
        drawText(this.config.replyText);

        left += this.config.replyGutterAfter;

        ctx.font = `500 ${this.config.fontSize}px -apple-system`;
        ctx.fillStyle = '#586c93';
        drawText(item.to);
      }

      left += this.config.colonGutterBefore;

      ctx.fillStyle = 'black';
      ctx.font = `${this.config.colonSize}px -apple-system`;
      drawText(':');

      left += this.config.colonGutterAfter;

      ctx.font = `${this.config.fontSize}px -apple-system`;
      drawText(item.content);

      // after each commit
      left = leftEdge;
      this.currentBaseline += this.config.commitLineHeight;
      if (index === 0) this.currentBaseline += this.config.commitFirstLineOffset;
    });
  }

  private renderPatch(): void {
    const canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('renderCanvas');
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

    // clip the area background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, this.currentBaseline + this.config.areaPaddingBottom, this.config.width, this.config.height - (this.currentBaseline + this.config.areaPaddingBottom));

    const c: HTMLCanvasElement = document.createElement('canvas');
    c.width = this.config.width;
    c.height = this.config.height;
    c.getContext('2d').putImageData(this.imageData, 0, 0);

    ctx.drawImage(c, 0,
      this.gutters[this.gutterIndex], this.config.width, this.config.height - (this.currentBaseline + this.config.areaPaddingBottom + this.config.areaMarginBottom),
      0, this.currentBaseline + this.config.areaPaddingBottom + this.config.areaMarginBottom,
      this.config.width, this.config.height - (this.currentBaseline + this.config.areaPaddingBottom + this.config.areaMarginBottom),
    );

    document.getElementsByTagName('img')[0].src = ctx.canvas.toDataURL('image/jpeg', 1);

    this.rendering = false;
  }
}
