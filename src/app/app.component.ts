import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular16';

  constructor() { }

  cells = Array(100).fill(0); // Adjust number of cells as needed
  progress = 0;
  markers: { position: number }[] = []; // Explicitly define the type of markers array
  isPlaying = false;
  intervalId: any;

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.startProgress();
    } else {
      clearInterval(this.intervalId);
    }
  }

  startProgress() {
    this.intervalId = setInterval(() => {
      this.progress += 1;
      if (this.progress > 100) {
        this.progress = 0;
      }
    }, 100); // Adjust speed as needed
  }

  addMarker() {
    this.markers.push({ position: this.progress });
  }

  removeMarker(index: number) {
    this.markers.splice(index, 1);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
  // marks: any =
  // {
  //     colorRemaining: { color: '#373636', border: '#373636' },
  //     colorProgress: { color: '#373636', border: '#373636' },
  //     type: 'line',
  //     offset: '71%',
  //     thickness: 1,
  //     size: '6%',
  //     majorSize: '9%',
  //     majorInterval: 10,
  //     minorInterval: 2
  // };
  // labels: any =
  // {
  //     offset: '28%',
  //     step: 10,
  //     visible: false
  // };
  // progressBar: any =
  // {
  //     size: '90%',
  //     offset: '0%',
  //     background: {
  //         stroke: '#373636', strokeWidth: 1, fill: { color: 'blue', gradientType: "linear", gradientStops: [[0, 1], [50, 0.5], [100, 1]] }
  //     }
  // };
  // pointer: any =
  // {
  //     type: 'circle', style: { fill: { color: 'black', gradientType: "linear", gradientStops: [[0, 0.5], [50, 0.6], [100, 1]] }, stroke: '#333' },
  //     size: '24%', offset: '60%'
  // };

  // onvolchange(val: any) {
  //   console.log(val.args.value)
  // }
}
