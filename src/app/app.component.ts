import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TestserviceService } from './testservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular16';
  annuswaramForm: FormGroup;

  syllables: string[];
  editForm: FormGroup;
  editingSyllable: string | null = null;
  @ViewChild('swaramInput', { static: false }) swaramInput!: ElementRef;
  constructor(private fb: FormBuilder,
    private renderer: Renderer2, public testserviceService: TestserviceService) {
    this.annuswaramForm = this.fb.group({
      syllable: [''],
      annuswaram: ['']
    });


    this.syllables = Object.keys(this.testserviceService.getAllAnnuswarams());
    this.editForm = this.fb.group({
      annuswaram: ['']
    });
  }
  // onSubmit() {
  //   const formValues = this.annuswaramForm.value;
  //   // Save the annuswaram or perform other actions
  //   console.log('Annuswaram created:', formValues);
  // }
  // cells = Array(100).fill(0); // Adjust number of cells as needed
  // progress = 0;
  // markers: { position: number }[] = []; // Explicitly define the type of markers array
  // isPlaying = false;
  // intervalId: any;




  // togglePlay() {
  //   this.isPlaying = !this.isPlaying;
  //   if (this.isPlaying) {
  //     this.startProgress();
  //   } else {
  //     clearInterval(this.intervalId);
  //   }
  // }

  // startProgress() {
  //   this.intervalId = setInterval(() => {
  //     this.progress += 1;
  //     if (this.progress > 100) {
  //       this.progress = 0;
  //     }
  //   }, 100); // Adjust speed as needed
  // }

  // addMarker() {
  //   this.markers.push({ position: this.progress });
  // }

  // removeMarker(index: number) {
  //   this.markers.splice(index, 1);
  // }

  ngOnDestroy() {
    // clearInterval(this.intervalId);
  }


  // getAnnuswaram(syllable: string): string | undefined {
  //   return this.testserviceService.getAnnuswaram(syllable);
  // }

  // editAnnuswaram(syllable: string) {
  //   this.editingSyllable = syllable;
  //   const annuswaram = this.getAnnuswaram(syllable);
  //   this.editForm.setValue({ annuswaram: annuswaram || '' });
  // }

  // onEditSubmit() {
  //   if (this.editingSyllable) {
  //     this.testserviceService.addAnnuswaram(this.editingSyllable, this.editForm.value.annuswaram);
  //     this.editingSyllable = null;
  //   }
  // }
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





  // tooltipStyle = {
  //   top: '0px',
  //   left: '0px',
  //   display: 'none'
  // };

  // @HostListener('window:mouseup', ['$event'])
  // onMouseUp(event: MouseEvent) {
  //   const sel = window.getSelection();
  //   if (sel && !sel.isCollapsed) {
  //     const rel1 = this.getRelativeElement('cal1');
  //     const rel2 = this.getRelativeElement('cal2');
  //     const r = sel.getRangeAt(0).getBoundingClientRect();
  //     const rb1 = rel1.getBoundingClientRect();
  //     const rb2 = rel2.getBoundingClientRect();

  //     this.tooltipStyle.top = (r.bottom - rb2.top) * 100 / (rb1.top - rb2.top) + 'px';
  //     this.tooltipStyle.left = (r.left - rb2.left) * 100 / (rb1.left - rb2.left) + 'px';
  //     this.tooltipStyle.display = 'block';

  //     // Focus the input inside the tooltip
  //     setTimeout(() => this.swaramInput.nativeElement.focus(), 0);
  //   }
  // }

  // @HostListener('window:mousedown')
  // onMouseDown() {
  //   this.tooltipStyle.display = 'none';
  // }

  // private getRelativeElement(id: string): HTMLElement {
  //   return this.renderer.selectRootElement(`#${id}`, true);
  // }


  isTextarea: boolean = true;
  inputText: string = 's r g m p';  // Initial data in textarea

  get splitInputText(): string[] {
    return this.inputText.split(' ').filter(str => str.trim().length > 0);
  }

  toggleInputType() {
    this.isTextarea = !this.isTextarea;
  }














}







