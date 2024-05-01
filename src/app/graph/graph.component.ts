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
  template: `<canvas
    #graph
    (mousedown)="startPanning($event)"
    (wheel)="zoom($event)"
  ></canvas>`,
  styleUrl: './graph.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphComponent implements AfterViewInit {
  @ViewChild('graph') graph!: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D | null = null;
  private isPanning: boolean = false;
  private startX: number = 0;
  private startY: number = 0;
  private offsetX: number = 0;
  private offsetY: number = 0;
  private scale: number = 1;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.resizeCanvas();
    this.draw();
  }

  @HostListener('document:mousemove', ['$event'])
  onPan(event: MouseEvent) {
    if (!this.isPanning || !this.ctx) return;
    this.offsetX = event.clientX - this.startX;
    this.offsetY = event.clientY - this.startY;
    this.draw();
  }

  @HostListener('document:mouseup', ['$event'])
  endPanning(event: MouseEvent) {
    this.isPanning = false;
  }

  startPanning(event: MouseEvent) {
    this.isPanning = true;
    this.startX = event.clientX - this.offsetX;
    this.startY = event.clientY - this.offsetY;
  }

  zoom(event: WheelEvent) {
    event.preventDefault();
    const zoomIntensity = 0.1;
    const oldScale = this.scale;
    if (event.deltaY < 0) {
      this.scale *= 1 + zoomIntensity;
    } else {
      this.scale *= 1 - zoomIntensity;
    }
    this.adjustPanForZoom(oldScale);
    this.draw();
  }

  adjustPanForZoom(oldScale: number) {
    const factor = this.scale / oldScale;
    this.offsetX =
      factor * this.offsetX +
      ((1 - factor) * this.graph.nativeElement.clientWidth) / 2;
    this.offsetY =
      factor * this.offsetY +
      ((1 - factor) * this.graph.nativeElement.clientHeight) / 2;
  }

  resizeCanvas() {
    const canvas = this.graph.nativeElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  ngAfterViewInit(): void {
    this.ctx = this.graph.nativeElement.getContext('2d');
    this.resizeCanvas();
    this.draw();
  }

  private draw() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.save();
    this.ctx.translate(this.offsetX, this.offsetY);
    this.ctx.scale(this.scale, this.scale);

    const width = this.ctx.canvas.width;
    const height = this.ctx.canvas.height;

    // Example drawing code
    this.ctx.fillStyle = 'rgba(100, 100, 200, 0.5)';
    this.ctx.fillRect(width * 0.1, height * 0.2, width * 0.8, height * 0.6);
    this.ctx.clearRect(width * 0.3, height * 0.3, width * 0.4, height * 0.4);
    this.ctx.strokeRect(width * 0.4, height * 0.4, width * 0.2, height * 0.2);

    this.ctx.restore();
  }
}
