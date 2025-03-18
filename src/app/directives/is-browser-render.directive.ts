import { isPlatformBrowser } from '@angular/common';
import { Directive, inject, input, OnInit, PLATFORM_ID, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[isBrowserRender]'
})
export class IsBrowserRenderDirective implements OnInit {
  public readonly isBrowserRender = input<boolean>(true);

  private readonly platformId = inject(PLATFORM_ID);
  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainerRef = inject(ViewContainerRef);

  ngOnInit(): void {
    if (!this.isBrowserRender()) {
      this.createView();
    } else if (this.isBrowserRender() && isPlatformBrowser(this.platformId)) {
      this.createView();
    } else {
      this.viewContainerRef.clear();
    }
  }

  private createView() {
    this.viewContainerRef.createEmbeddedView(this.templateRef);
  }
}
