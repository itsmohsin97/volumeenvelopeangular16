import { Component, OnInit, OnDestroy, ElementRef, ViewChild, HostListener } from '@angular/core';
import * as d3 from 'd3';
import WaveSurfer from 'wavesurfer.js';
import EnvelopePlugin from 'wavesurfer.js/dist/plugins/envelope';

@Component({
  selector: 'app-audio-waveform',
  templateUrl: './audio-waveform.component.html',
  styleUrls: ['./audio-waveform.component.css']
})
export class AudioWaveformComponent implements OnInit, OnDestroy {
  @ViewChild('waveform', { static: true }) waveformRef!: ElementRef;
  private waveSurfer!: WaveSurfer;
  private envelopePlugin: any;
  private points: any[] = [];
  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.waveSurfer = WaveSurfer.create({
      container: this.waveformRef.nativeElement,
      waveColor: 'violet',
      progressColor: 'purple',
      plugins: [
        EnvelopePlugin.create({
          points: [
            { time: 0, volume: 1 },
            { time: 2, volume: 0.5 },
            { time: 15, volume: 0.25 }
          ],
          lineWidth: "1",  // Disable the default line drawing
          lineColor: 'blue',
          dragLine: true,
          dragPointSize: 10,
          dragPointFill: 'blue',
          dragPointStroke: 'blue'
        })
      ]
    });

    this.envelopePlugin = this.waveSurfer.getActivePlugins().find(plugin => plugin instanceof EnvelopePlugin);

    // Store initial points
    this.points = this.envelopePlugin.getPoints();
    this.drawCurve();

    // Set up click event on waveform container
    this.waveformRef.nativeElement.addEventListener('click', (e: MouseEvent) => {
      const clickedPoint = this.getClickedPoint(e);
      if (clickedPoint) {
        this.removePoint(clickedPoint);
      }
    });

    // Confirm the event listener is attached
    this.envelopePlugin.on('point-update', () => {
      console.log('Event listener attached for point-update');
    });

    // Listen for point updates
    this.envelopePlugin.on('point-update', () => {
      this.points = this.envelopePlugin.getPoints();
      console.log('Point updated:', this.points);
      this.drawCurve();
    });

    // Load an audio file
    this.waveSurfer.load('assets/Osaka.wav');
  }
  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement;
  }

  ngOnDestroy(): void {
    if (this.waveSurfer) {
      this.waveSurfer.destroy();
    }
  }

  play(): void {
    this.waveSurfer.playPause();
  }

  stop(): void {
    this.waveSurfer.stop();
  }

  removePoint(point: { time: number, volume: number }): void {
    this.envelopePlugin.removePoint(point);
    // Update points after removal
    this.points = this.envelopePlugin.getPoints();
    console.log('Point removed:', this.points);
    this.drawCurve();
  }

  private getClickedPoint(event: MouseEvent): { time: number, volume: number } | null {
    const rect = this.waveformRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;

    // Calculate the waveform width and click position
    const duration = this.waveSurfer.getDuration();
    const waveformWidth = this.waveformRef.nativeElement.clientWidth;
    const clickedTime = (x / waveformWidth) * duration;

    // Find the nearest point to the clicked time
    const threshold = 0.1; // Adjust as needed
    const closestPoint = this.points.reduce((closest, point) => {
      return Math.abs(point.time - clickedTime) < Math.abs(closest.time - clickedTime) ? point : closest;
    }, { time: -Infinity, volume: 0 });

    return Math.abs(closestPoint.time - clickedTime) < threshold ? closestPoint : null;
  }

  private drawCurve(): void {
    this.points = this.envelopePlugin.getPoints();
    console.log('Drawing curve with points:', this.points);

    const svg = d3.select(this.waveformRef.nativeElement).select('svg');
    if (!svg.empty()) {
      svg.remove();
    }

    const svgWidth = this.waveformRef.nativeElement.clientWidth;
    const svgHeight = 200; // Adjust as needed

    const xScale = d3.scaleLinear()
      .domain([0, this.waveSurfer.getDuration()])
      .range([0, svgWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, 1])
      .range([svgHeight, 0]);

    const line = d3.line<{ time: number, volume: number }>()
      .x(d => xScale(d.time))
      .y(d => yScale(d.volume))
      .curve(d3.curveMonotoneX); // You can use different curve types here

    const svgElement = d3.select(this.waveformRef.nativeElement)
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    svgElement.append('path')
      .datum(this.points)
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('stroke-width', 2);
  } 
  /**
   * startCurve
   */
  @HostListener('mousemove') onClick() {
    // console.log(this.elementRef.nativeElement);
    this.drawCurve();
  }

}

