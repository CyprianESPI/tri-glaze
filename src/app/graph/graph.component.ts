import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule],
  template: `<canvas #graph></canvas>`,
  styleUrl: './graph.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphComponent implements AfterViewInit {
  @ViewChild('graph') graph!: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D | null = null;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    console.log('onResize', event);
    this.resizeCanvas();
    this.draw();
  }

  resizeCanvas() {
    const canvas = this.graph.nativeElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  ngAfterViewInit(): void {
    this.ctx = this.graph.nativeElement.getContext('2d');
    console.log('ngAfterViewInit', this.ctx);

    setInterval(() => {
      this.resizeCanvas();
      this.draw();
    }, 1000 + 0 * 42);
  }
  /* important! for alignment, you should make things
   * relative to the canvas' current width/height.
   */
  private draw() {
    const ctx = this.ctx;
    if (!ctx) {
      return;
    }
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    //...drawing code...
    console.log(`Draw: ${width}x${height}`, ctx);
    ctx.fillRect(
      width * 0.1,
      height * 0.2,
      width * (0.9 - 0.1),
      height * (0.8 - 0.2)
    );
    ctx.clearRect(
      width * 0.3,
      height * 0.3,
      width * (0.7 - 0.3),
      height * (0.7 - 0.3)
    );
    ctx.strokeRect(
      width * 0.4,
      height * 0.4,
      width * (0.6 - 0.4),
      height * (0.6 - 0.4)
    );
  }
}
