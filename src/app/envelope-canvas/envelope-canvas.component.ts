import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { EnvelopeStateService } from '../envelope-state.service';

@Component({
  selector: 'app-envelope-canvas',
  templateUrl: './envelope-canvas.component.html',
  styleUrls: ['./envelope-canvas.component.css']
})
export class EnvelopeCanvasComponent implements OnInit {
  @ViewChild('envelopeCanvas', { static: true }) envelopeCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private width: number = 800;
  private height: number = 400;
  private dots: { x: number, y: number }[] = [];
  private draggingDotIndex: number | null = null;

  constructor(private envelopeStateService: EnvelopeStateService) {}

  ngOnInit(): void {
    const canvas = this.envelopeCanvas.nativeElement;
    const context = canvas.getContext('2d');
    if (context) {
      this.ctx = context;
      this.envelopeStateService.points$.subscribe(points => {
        this.dots = points;
        this.draw();
      });
    } else {
      console.error('Failed to get 2D context');
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    const rect = this.envelopeCanvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.draggingDotIndex = this.getDotIndex(x, y);
    if (this.draggingDotIndex === null) {
      this.dots.push({ x, y });
      this.envelopeStateService.addPoint({ x, y });
      this.draw();
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.draggingDotIndex !== null) {
      const rect = this.envelopeCanvas.nativeElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      this.dots[this.draggingDotIndex] = { x, y };
      this.envelopeStateService.updatePoints(this.dots);
      this.draw();
    }
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    this.draggingDotIndex = null;
  }

  @HostListener('dblclick', ['$event'])
  onDoubleClick(event: MouseEvent): void {
    const rect = this.envelopeCanvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const dotIndex = this.getDotIndex(x, y);
    if (dotIndex !== null) {
      this.dots.splice(dotIndex, 1);
      this.envelopeStateService.updatePoints(this.dots);
      this.draw();
    }
  }

  private getDotIndex(x: number, y: number): number | null {
    const radius = 5;
    for (let i = 0; i < this.dots.length; i++) {
      const dot = this.dots[i];
      if (Math.sqrt((x - dot.x) ** 2 + (y - dot.y) ** 2) < radius) {
        return i;
      }
    }
    return null;
  }

  private draw(): void {
    this.clearCanvas();
    this.drawAxes();
    this.drawEnvelope();
    this.drawDots();
  }

  private clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  private drawAxes(): void {
    this.ctx.beginPath();
    this.ctx.moveTo(40, 0);
    this.ctx.lineTo(40, this.height - 40);
    this.ctx.lineTo(this.width, this.height - 40);
    this.ctx.strokeStyle = '#000';
    this.ctx.stroke();

    // Label the axes
    this.ctx.fillStyle = '#000';
    this.ctx.font = '12px Arial';
    this.ctx.fillText('Time', this.width / 2, this.height - 10);
    this.ctx.fillText('Volume', 5, this.height / 2);
  }

  private drawEnvelope(): void {
    this.ctx.beginPath();
    this.ctx.moveTo(40, this.height - 40);
    for (const dot of this.dots) {
      this.ctx.lineTo(dot.x, dot.y);
    }
    this.ctx.lineTo(this.width, this.height - 40);
    this.ctx.strokeStyle = '#007BFF';
    this.ctx.stroke();
  }

  private drawDots(): void {
    this.ctx.fillStyle = '#FF0000';
    for (const dot of this.dots) {
      this.ctx.beginPath();
      this.ctx.arc(dot.x, dot.y, 5, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }
}
