import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
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

  ngAfterViewInit(): void {
    this.ctx = this.graph.nativeElement.getContext('2d');
    console.log('ngAfterViewInit', this.ctx);

    setInterval(() => {
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
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    // Clear
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    //...drawing code...
    console.log('draw', ctx);
    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  }
}
