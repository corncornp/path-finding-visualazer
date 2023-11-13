import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAcheronTooltip]'
})
export class AcheronTooltipDirective {
  @Input('appAcheronTooltip')
  tooltipTemplate!: TemplateRef<any>;
  constructor(private elRef: ElementRef, private renderer: Renderer2, private vcr: ViewContainerRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    const position = this.elRef.nativeElement.getBoundingClientRect();
    const tooltipElement = this.vcr.createEmbeddedView(this.tooltipTemplate).rootNodes[0];
    this.renderer.appendChild(this.elRef.nativeElement, tooltipElement);
    const tooltipElement2 = this.elRef.nativeElement.querySelector('.custom-tooltip');
    this.renderer.setStyle(tooltipElement2, 'display', 'block');
    this.renderer.setStyle(tooltipElement2, 'left', position.x - 170 + 'px');
    this.renderer.setStyle(tooltipElement2, 'top', position.y + 60 + 'px');
  }

  @HostListener('mouseleave') onMouseLeave() {
    const tooltipElement = this.elRef.nativeElement.querySelector('.custom-tooltip');
    this.renderer.setStyle(tooltipElement, 'display', 'none');
    this.vcr.clear();
  }
}
