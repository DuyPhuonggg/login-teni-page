import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var TweenMax: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit, OnDestroy {
    // @ViewChild('loginEmailInput') email!: ElementRef;
    // @ViewChild('loginEmailLabel') emailLabel!: ElementRef;
    // @ViewChild('loginPasswordInput') password!: ElementRef;
    // @ViewChild('loginPasswordLabel') passwordLabel!: ElementRef;
    // @ViewChild('showPasswordCheck') showPasswordCheck!: ElementRef;
    // @ViewChild('showPasswordToggleLabel') showPasswordToggleLabel!: ElementRef;
    @ViewChild('svgContainer') svgContainer!: ElementRef;
    @ViewChild('loginEmailInput') loginEmail!: ElementRef;
    @ViewChild('loginPasswordInput') loginPassword!: ElementRef;
    @ViewChild('loginEmailLabel') loginEmailLabel!: ElementRef;
    @ViewChild('showPasswordCheck') showPasswordCheck!: ElementRef;
    @ViewChild('showPasswordToggle') showPasswordToggle!: ElementRef;
    // @ViewChild('twoFingers') twoFingers!: ElementRef;

    // @ViewChild('armL') armL!: ElementRef;
    // @ViewChild('armR') armR!: ElementRef;
    // @ViewChild('eyeL') eyeL!: ElementRef;
    // @ViewChild('eyeR') eyeR!: ElementRef;
    // @ViewChild('nose') nose!: ElementRef;
    // @ViewChild('mouth') mouth!: ElementRef;
    // @ViewChild('mouthBG') mouthBG!: ElementRef;
    // @ViewChild('mouthSmallBG') mouthSmallBG!: ElementRef;
    // @ViewChild('mouthMediumBG') mouthMediumBG!: ElementRef;
    // @ViewChild('mouthLargeBG') mouthLargeBG!: ElementRef;
    // @ViewChild('mouthMaskPath') mouthMaskPath!: ElementRef;
    // @ViewChild('mouthOutline') mouthOutline!: ElementRef;
    // @ViewChild('tooth') tooth!: ElementRef;
    // @ViewChild('tongue') tongue!: ElementRef;
    // @ViewChild('chin') chin!: ElementRef;
    // @ViewChild('face') face!: ElementRef;
    // @ViewChild('eyebrow') eyebrow!: ElementRef;
    // @ViewChild('outerEarL') outerEarL!: ElementRef;
    // @ViewChild('outerEarR') outerEarR!: ElementRef;
    // @ViewChild('earHairL') earHairL!: ElementRef;
    // @ViewChild('earHairR') earHairR!: ElementRef;
    // @ViewChild('hair') hair!: ElementRef;
    // @ViewChild('bodyBG') bodyBG!: ElementRef;
    // @ViewChild('bodyBGchanged') bodyBGchanged!: ElementRef;

    // private activeElement: string | null = null;
    // private curEmailIndex: number = 0;
    // private screenCenter: number = 0;
    // private svgCoords: any;
    // private emailCoords: { x: number; y: number} = { x: 0, y: 0};
    // private emailScrollMax: number = 0;
    // private readonly chinMin: number = 0.5;
    // private dFromC: number = 0;
    // private mouthStatus: string = 'small';
    // private blinking: any;
    // private eyeScale: number = 1;
    // private eyesCovered: boolean = false;
    // private showPasswordClicked: boolean = false;
    // private eyeLCoords: { x: number; y: number} = { x: 0, y: 0};
    // private eyeRCoords: { x: number; y: number} = { x: 0, y: 0};
    // private noseCoords: { x: number; y: number} = { x: 0, y: 0};
    // private mouthCoords: { x: number; y: number} = { x: 0, y: 0};

    // private eyeLAngle: any;
    // private eyeLX: any;
    // private eyeLY: any;
    // private eyeRAngle: any;
    // private eyeRX: any;
    // private eyeRY: any;
    // private noseAngle: any;
    // private noseX: any;
    // private noseY: any;
    // private mouthAngle: any;
    // private mouthX: any;
    // private mouthY: any;
    // private mouthR: any;
    // private chinX: any;
    // private chinY: any;
    // private chinS: any;
    // private faceX: any;
    // private faceY: any;
    // private faceSkew: any;
    // private eyebrowSkew: any;
    // private outerEarX: any;
    // private outerEarY: any;
    // private hairX: any;
    // private hairS: any;

    // constructor() {}

    // ngOnInit() {
    //     // setTimeout(() => this.initLoginForm(), 0);
    // }

    // private initLoginForm(): void {
    //     // this.svgCoords = this.getPosition(this.mySVG.nativeElement);
    //     this.emailCoords = this.getPosition(this.email.nativeElement);
    //     // this.screenCenter = this.svgCoords.x + this.mySVG.nativeElement.offsetWidth / 2;
    //     // this.eyeLCoords = { x: this.svgCoords.x + 84, y: this.svgCoords.y + 76 };
    //     // this.eyeRCoords = { x: this.svgCoords.x + 113, y: this.svgCoords.y + 76 };
    //     // this.noseCoords = { x: this.svgCoords.x + 97, y: this.svgCoords.y + 81 };
    //     // this.mouthCoords = { x: this.svgCoords.x + 100, y: this.svgCoords.y + 100 };
    //     //
    //     // // Set vị trí ban đầu cho cánh tay
    //     // TweenMax.set(this.armL.nativeElement, {
    //     //     x: -93,
    //     //     y: 220,
    //     //     rotation: 105,
    //     //     transformOrigin: 'top left',
    //     // });
    //     // TweenMax.set(this.armR.nativeElement, {
    //     //     x: -93,
    //     //     y: 220,
    //     //     rotation: -105,
    //     //     transformOrigin: 'top right',
    //     // });
    //     //
    //     // // Set thuộc tính ban đầu cho miệng
    //     // TweenMax.set(this.mouth.nativeElement, {
    //     //     transformOrigin: 'center center',
    //     // });
    //     //
    //     // // Kích hoạt hiệu ứng nháy mắt
    //     // this.startBlinking(5);
    //     //
    //     // // Xác định độ dài tối đa của input email
    //     // this.emailScrollMax = this.email.nativeElement.scrollWidth;
    //     //
    //     // // Kiểm tra thiết bị di động
    //     // if (this.isMobileDevice()) {
    //     //     this.password.nativeElement.type = 'text';
    //     //     this.showPasswordCheck.nativeElement.checked = true;
    //     //     TweenMax.set(this.twoFingers.nativeElement, {
    //     //         transformOrigin: 'bottom left',
    //     //         rotation: 30,
    //     //         x: -9,
    //     //         y: -2,
    //     //         ease: 'Power2.easeInOut',
    //     //     });
    //     // }
    // }

    // onEmailInput(): void {
    //      this.email.nativeElement.parentElement.classList.add('focusWithText');
    //     this.calculateFaceMove();
    //     const value = this.email.nativeElement.value;
    //     console.log(this.calculateFaceMove(), value)
    //     // this.curEmailIndex = value.length;
    //     //
    //     // if (this.curEmailIndex > 0) {
    //     //     if (this.mouthStatus == 'small') {
    //     //         this.mouthStatus = 'medium';
    //     //         TweenMax.to(
    //     //             [
    //     //                 this.mouthBG.nativeElement,
    //     //                 this.mouthOutline.nativeElement,
    //     //                 this.mouthMaskPath.nativeElement,
    //     //             ],
    //     //             1,
    //     //             {
    //     //                 morphSVG: this.mouthMediumBG.nativeElement,
    //     //                 shapeIndex: 8,
    //     //                 ease: 'Expo.easeOut',
    //     //             },
    //     //         );
    //     //         // ... Thêm các animation khác tương tự
    //     //     }
    //     // }
    // }

    // // // Thêm các phương thức khác tương tự...
    // //
    // // private calculateFaceMove(): void {
    // //     // Logic tính toán chuyển động khuôn mặt
    // // }
    // //
    // // private getPosition(el: HTMLElement): { x: number; y: number } {
    // //     let xPos = 0;
    // //     let yPos = 0;
    // //
    // //     while (el) {
    // //         if (el.tagName == 'BODY') {
    // //             xPos +=
    // //                 el.offsetLeft -
    // //                 (document.documentElement.scrollLeft || document.body.scrollLeft) +
    // //                 el.clientLeft;
    // //             yPos +=
    // //                 el.offsetTop -
    // //                 (document.documentElement.scrollTop || document.body.scrollTop) +
    // //                 el.clientTop;
    // //         } else {
    // //             xPos += el.offsetLeft - el.scrollLeft + el.clientLeft;
    // //             yPos += el.offsetTop - el.scrollTop + el.clientTop;
    // //         }
    // //         el = el.offsetParent as HTMLElement;
    // //     }
    // //     return { x: xPos, y: yPos };
    // // }
    // //
    // // private isMobileDevice(): boolean {
    // //     return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    // //         navigator.userAgent,
    // //     );
    // // }
    // //
    // // private startBlinking(delay: number): void {
    // //     if (delay) {
    // //         delay = this.getRandomInt(delay);
    // //     } else {
    // //         delay = 1;
    // //     }
    // //     this.blinking = TweenMax.to([this.eyeL.nativeElement, this.eyeR.nativeElement], 0.1, {
    // //         delay: delay,
    // //         scaleY: 0,
    // //         yoyo: true,
    // //         repeat: 1,
    // //         transformOrigin: 'center center',
    // //         onComplete: () => {
    // //             this.startBlinking(12);
    // //         },
    // //     });
    // // }
    // //
    // // private getRandomInt(max: number): number {
    // //     return Math.floor(Math.random() * Math.floor(max));
    // // }

    // private calculateFaceMove() {
    //     let carPos = this.email.nativeElement.selectionEnd;
    //     const div = document.createElement('div');
    //     const span = document.createElement('span');
    //     let copyStyle = getComputedStyle(this.email.nativeElement);
    //     let caretCoords = { x: 0, y: 0 };
    //     if (carPos == null || carPos == 0) {
    //         carPos = this.email.nativeElement.value.length;
    //     }
    //     [].forEach.call(copyStyle, function (prop) {
    //         div.style[prop] = copyStyle[prop];
    //     });
    //     div.style.position = 'absolute';
    //     document.body.appendChild(div);
    //     div.textContent = this.email.nativeElement.value.substring(0, carPos);
    //     span.textContent = this.email.nativeElement.value.substring(carPos) || '.';
    //     div.appendChild(span);

    //     if (this.email.nativeElement.scrollWidth <= this.emailScrollMax) {
    //         caretCoords = this.getPosition(span);
    //         this.dFromC = this.screenCenter - (caretCoords.x + this.emailCoords.x);
    //         this.eyeLAngle = this.getAngle(
    //             this.eyeLCoords.x,
    //             this.eyeLCoords.y,
    //             this.emailCoords.x + caretCoords.x,
    //             this.emailCoords.y + 25,
    //         );
    //         this.eyeRAngle =  this.getAngle(
    //             this.eyeRCoords.x,
    //             this.eyeRCoords.y,
    //             this.emailCoords.x + caretCoords.x,
    //             this.emailCoords.y + 25,
    //         );
    //         this.noseAngle =  this.getAngle(
    //             this.noseCoords.x,
    //             this.noseCoords.y,
    //             this.emailCoords.x + caretCoords.x,
    //             this.emailCoords.y + 25,
    //         );
    //         this.mouthAngle =  this.getAngle(
    //             this.mouthCoords.x,
    //             this.mouthCoords.y,
    //             this.emailCoords.x + caretCoords.x,
    //             this.emailCoords.y + 25,
    //         );
    //     } else {
    //         this.eyeLAngle = this.getAngle(
    //             this.eyeLCoords.x,
    //             this.eyeLCoords.y,
    //             this.emailCoords.x + this.emailScrollMax,
    //             this.emailCoords.y + 25,
    //         );
    //         this.eyeRAngle = this.getAngle(
    //             this.eyeRCoords.x,
    //           this.eyeRCoords.y,
    //           this.emailCoords.x + this.emailScrollMax,
    //           this.emailCoords.y + 25,
    //         );
    //         this.noseAngle = this.getAngle(
    //           this.noseCoords.x,
    //           this.noseCoords.y,
    //           this.emailCoords.x + this.emailScrollMax,
    //           this.emailCoords.y + 25,
    //         );
    //         this.mouthAngle = this.getAngle(
    //           this.mouthCoords.x,
    //           this.mouthCoords.y,
    //           this.emailCoords.x + this.emailScrollMax,
    //           this.emailCoords.y + 25,
    //         );
    //     }

    //   this.eyeLX = Math.cos(this.eyeLAngle) * 20;
    //   this.eyeLY = Math.sin(this.eyeLAngle) * 10;
    //   this.eyeRX = Math.cos(this.eyeRAngle) * 20;
    //   this.eyeRY = Math.sin(this.eyeRAngle) * 10;
    //   this.noseX = Math.cos(this.noseAngle) * 23;
    //   this.noseY = Math.sin(this.noseAngle) * 10;
    //   this.mouthX = Math.cos(this.mouthAngle) * 23;
    //   this.mouthY = Math.sin(this.mouthAngle) * 10;
    //   this.mouthR = Math.cos(this.mouthAngle) * 6;
    //   this.chinX = this.mouthX * 0.8;
    //   this.chinY = this.mouthY * 0.5;
    //   this.chinS = 1 - (this.dFromC * 0.15) / 100;
    //     if (this.chinS > 1) {
    //       this.chinS = 1 - (this.chinS - 1);
    //         if (this.chinS < this.chinMin) {
    //           this.chinS = this.chinMin;
    //         }
    //     }
    //   this.faceX = this.mouthX * 0.3;
    //   this.faceY = this.mouthY * 0.4;
    //   this.faceSkew = Math.cos(this.mouthAngle) * 5;
    //   this.eyebrowSkew = Math.cos(this.mouthAngle) * 25;
    //   this.outerEarX = Math.cos(this.mouthAngle) * 4;
    //   this.outerEarY = Math.cos(this.mouthAngle) * 5;
    //   this.hairX = Math.cos(this.mouthAngle) * 6;
    //   this.hairS = 1.2;

    //     TweenMax.to(this.eyeL, 1, { x: -this.eyeLX, y: -this.eyeLY, ease: Expo.easeOut });
    //     TweenMax.to(this.eyeR, 1, { x: -this.eyeRX, y: -this.eyeRY, ease: Expo.easeOut });
    //     TweenMax.to(this.nose, 1, {
    //         x: -this.noseX,
    //         y: -this.noseY,
    //         rotation: this.mouthR,
    //         transformOrigin: 'center center',
    //         ease: Expo.easeOut,
    //     });
    //     TweenMax.to(this.mouth, 1, {
    //         x: -this.mouthX,
    //         y: -this.mouthY,
    //         rotation: this.mouthR,
    //         transformOrigin: 'center center',
    //         ease: Expo.easeOut,
    //     });
    //     TweenMax.to(this.chin, 1, { x: -this.chinX, y: -this.chinY, scaleY: this.chinS, ease: Expo.easeOut });
    //     TweenMax.to(this.face, 1, {
    //         x: -this.faceX,
    //         y: -this.faceY,
    //         skewX: -this.faceSkew,
    //         transformOrigin: 'center top',
    //         ease: Expo.easeOut,
    //     });
    //     TweenMax.to(this.eyebrow, 1, {
    //         x: -this.faceX,
    //         y: -this.faceY,
    //         skewX: -this.eyebrowSkew,
    //         transformOrigin: 'center top',
    //         ease: Expo.easeOut,
    //     });
    //     TweenMax.to(this.outerEarL, 1, { x: this.outerEarX, y: -this.outerEarY, ease: Expo.easeOut });
    //     TweenMax.to(this.outerEarR, 1, { x: this.outerEarX, y: this.outerEarY, ease: Expo.easeOut });
    //     TweenMax.to(this.earHairL, 1, { x: -this.outerEarX, y: -this.outerEarY, ease: Expo.easeOut });
    //     TweenMax.to(this.earHairR, 1, { x: -this.outerEarX, y: this.outerEarY, ease: Expo.easeOut });
    //     TweenMax.to(this.hair, 1, {
    //         x: this.hairX,
    //         scaleY: this.hairS,
    //         transformOrigin: 'center bottom',
    //         ease: Expo.easeOut,
    //     });

    //     document.body.removeChild(div);
    // }

    // private getPosition(el: any) {
    //     let xPos = 0;
    //     let yPos = 0;

    //     while (el) {
    //         if (el.nativeElement.tagName == 'BODY') {
    //             // deal with browser quirks with body/window/document and page scroll
    //             let xScroll = el.nativeElement.scrollLeft || document.documentElement.scrollLeft;
    //             let yScroll = el.nativeElement.scrollTop || document.documentElement.scrollTop;

    //             xPos += el.nativeElement.offsetLeft - xScroll + el.nativeElement.clientLeft;
    //             yPos += el.nativeElement.offsetTop - yScroll + el.nativeElement.clientTop;
    //         } else {
    //             // for all other non-BODY elements
    //             xPos +=
    //                 el.nativeElement.offsetLeft -
    //                 el.nativeElement.scrollLeft +
    //                 el.nativeElement.clientLeft;
    //             yPos +=
    //                 el.nativeElement.offsetTop -
    //                 el.nativeElement.scrollTop +
    //                 el.nativeElement.clientTop;
    //         }

    //         el = el.nativeElement.offsetParent;
    //     }

    //     return {
    //         x: xPos,
    //         y: yPos,
    //     };
    // }

    // private getAngle(x1: any, y1: any, x2: any, y2: any) {
    //     return Math.atan2(y1 - y2, x1 - x2);
    // }

    loginForm: FormGroup;
    showPassword = false;
    emailFocused = false;

    // Animation state variables
    private activeElement: string | null = null;
    private curEmailIndex = 0;
    private screenCenter = 0;
    private svgCoords: any = {};
    private emailCoords: any = {};
    private emailScrollMax = 0;
    private chinMin = 0.5;
    private dFromC = 0;
    private mouthStatus = 'small';
    private blinking: any;
    private eyeScale = 1;
    private eyesCovered = false;
    private showPasswordClicked = false;

    // SVG element references
    private svgElements: any = {};

    // Coordinate variables
    private eyeLCoords: any = {};
    private eyeRCoords: any = {};
    private noseCoords: any = {};
    private mouthCoords: any = {};

    constructor(private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    ngAfterViewInit() {
        this.initLoginForm();
    }

    ngOnDestroy() {
        if (this.blinking) {
            this.blinking.kill();
        }
    }

    private initLoginForm() {
        // Get SVG elements
        this.getSVGElements();

        // Calculate positions
        this.calculatePositions();

        // Set initial positions
        this.setInitialPositions();

        // Start blinking animation
        this.startBlinking(5);

        // Handle mobile devices
        if (this.isMobileDevice()) {
            this.showPassword = true;
            this.spreadFingers();
        }
    }

    private getSVGElements() {
        const svg = this.svgContainer.nativeElement.querySelector('.svgContainer');

        // Store references to SVG elements
        this.svgElements = {
            twoFingers: svg.querySelector('.twoFingers'),
            armL: svg.querySelector('.armL'),
            armR: svg.querySelector('.armR'),
            eyeL: svg.querySelector('.eyeL'),
            eyeR: svg.querySelector('.eyeR'),
            nose: svg.querySelector('.nose'),
            mouth: svg.querySelector('.mouth'),
            mouthBG: svg.querySelector('.mouthBG'),
            mouthSmallBG: svg.querySelector('.mouthSmallBG'),
            mouthMediumBG: svg.querySelector('.mouthMediumBG'),
            mouthLargeBG: svg.querySelector('.mouthLargeBG'),
            mouthMaskPath: svg.querySelector('#mouthMaskPath'),
            mouthOutline: svg.querySelector('.mouthOutline'),
            tooth: svg.querySelector('.tooth'),
            tongue: svg.querySelector('.tongue'),
            chin: svg.querySelector('.chin'),
            face: svg.querySelector('.face'),
            eyebrow: svg.querySelector('.eyebrow'),
            outerEarL: svg.querySelector('.earL .outerEar'),
            outerEarR: svg.querySelector('.earR .outerEar'),
            earHairL: svg.querySelector('.earL .earHair'),
            earHairR: svg.querySelector('.earR .earHair'),
            hair: svg.querySelector('.hair'),
            bodyBG: svg.querySelector('.bodyBGnormal'),
            bodyBGchanged: svg.querySelector('.bodyBGchanged'),
        };
    }

    private calculatePositions() {
        const svg = this.svgContainer.nativeElement.querySelector('.svgContainer');
        const email = this.loginEmail.nativeElement;

        this.svgCoords = this.getPosition(svg);
        this.emailCoords = this.getPosition(email);
        this.screenCenter = this.svgCoords.x + svg.offsetWidth / 2;

        this.eyeLCoords = { x: this.svgCoords.x + 84, y: this.svgCoords.y + 76 };
        this.eyeRCoords = { x: this.svgCoords.x + 113, y: this.svgCoords.y + 76 };
        this.noseCoords = { x: this.svgCoords.x + 97, y: this.svgCoords.y + 81 };
        this.mouthCoords = { x: this.svgCoords.x + 100, y: this.svgCoords.y + 100 };

        this.emailScrollMax = email.scrollWidth;
    }

    private setInitialPositions() {
        if (this.svgElements.armL && this.svgElements.armR) {
            gsap.set(this.svgElements.armL, {
                x: -93,
                y: 220,
                rotation: 105,
                transformOrigin: 'top left',
            });
            gsap.set(this.svgElements.armR, {
                x: -93,
                y: 220,
                rotation: -105,
                transformOrigin: 'top right',
            });
        }

        if (this.svgElements.mouth) {
            gsap.set(this.svgElements.mouth, { transformOrigin: 'center center' });
        }
    }

    onEmailFocus(event: any) {
        this.activeElement = 'email';
        this.emailFocused = true;
        this.onEmailInput(event);
    }

    onEmailBlur(event: any) {
        this.activeElement = null;
        this.emailFocused = false;

        setTimeout(() => {
            if (this.activeElement !== 'email') {
                this.resetFace();
            }
        }, 100);
    }

    onEmailInput(event: any) {
        this.calculateFaceMove(event);
        const value = event.target.value;
        this.curEmailIndex = value.length;

        // Email validation effects
        if (this.curEmailIndex > 0) {
            if (this.mouthStatus === 'small') {
                this.mouthStatus = 'medium';
                this.animateMouthMedium();
            }

            if (value.includes('@')) {
                this.mouthStatus = 'large';
                this.animateMouthLarge();
            } else {
                this.mouthStatus = 'medium';
                this.animateMouthMedium();
            }
        } else {
            this.mouthStatus = 'small';
            this.animateMouthSmall();
        }
    }

    onEmailLabelClick() {
        this.activeElement = 'email';
        this.loginEmail.nativeElement.focus();
    }

    onPasswordFocus(event: any) {
        this.activeElement = 'password';
        if (!this.eyesCovered) {
            this.coverEyes();
        }
    }

    onPasswordBlur(event: any) {
        this.activeElement = null;
        setTimeout(() => {
            if (this.activeElement !== 'toggle' && this.activeElement !== 'password') {
                this.uncoverEyes();
            }
        }, 100);
    }

    onPasswordToggleFocus(event: any) {
        this.activeElement = 'toggle';
        if (!this.eyesCovered) {
            this.coverEyes();
        }
    }

    onPasswordToggleBlur(event: any) {
        this.activeElement = null;
        if (!this.showPasswordClicked) {
            setTimeout(() => {
                if (this.activeElement !== 'password' && this.activeElement !== 'toggle') {
                    this.uncoverEyes();
                }
            }, 100);
        }
    }

    onPasswordToggleMouseDown(event: any) {
        this.showPasswordClicked = true;
    }

    onPasswordToggleMouseUp(event: any) {
        this.showPasswordClicked = false;
    }

    onPasswordToggleChange(event: any) {
        setTimeout(() => {
            if (this.showPassword) {
                this.spreadFingers();
            } else {
                this.closeFingers();
            }
        }, 100);
    }

    onPasswordToggleClick(event: any) {
        event.target.focus();
    }

    private calculateFaceMove(event: any) {
        const email = this.loginEmail.nativeElement;
        const carPos = email.selectionEnd || email.value.length;

        const div = document.createElement('div');
        const span = document.createElement('span');
        const copyStyle = getComputedStyle(email);

        // Copy styles
        Array.from(copyStyle).forEach((prop: any) => {
            (div.style as any)[prop] = (copyStyle as any)[prop];
        });

        div.style.position = 'absolute';
        document.body.appendChild(div);
        div.textContent = email.value.substr(0, carPos);
        span.textContent = email.value.substr(carPos) || '.';
        div.appendChild(span);

        let caretCoords: any = {};

        if (email.scrollWidth <= this.emailScrollMax) {
            caretCoords = this.getPosition(span);
            this.dFromC = this.screenCenter - (caretCoords.x + this.emailCoords.x);
        }

        // Calculate angles and positions
        const targetX =
            email.scrollWidth <= this.emailScrollMax
                ? this.emailCoords.x + caretCoords.x
                : this.emailCoords.x + this.emailScrollMax;
        const targetY = this.emailCoords.y + 25;

        const eyeLAngle = this.getAngle(this.eyeLCoords.x, this.eyeLCoords.y, targetX, targetY);
        const eyeRAngle = this.getAngle(this.eyeRCoords.x, this.eyeRCoords.y, targetX, targetY);
        const noseAngle = this.getAngle(this.noseCoords.x, this.noseCoords.y, targetX, targetY);
        const mouthAngle = this.getAngle(this.mouthCoords.x, this.mouthCoords.y, targetX, targetY);

        // Calculate movements
        const eyeLX = Math.cos(eyeLAngle) * 20;
        const eyeLY = Math.sin(eyeLAngle) * 10;
        const eyeRX = Math.cos(eyeRAngle) * 20;
        const eyeRY = Math.sin(eyeRAngle) * 10;
        const noseX = Math.cos(noseAngle) * 23;
        const noseY = Math.sin(noseAngle) * 10;
        const mouthX = Math.cos(mouthAngle) * 23;
        const mouthY = Math.sin(mouthAngle) * 10;
        const mouthR = Math.cos(mouthAngle) * 6;

        // Apply animations
        this.animateFaceMovement(
            eyeLX,
            eyeLY,
            eyeRX,
            eyeRY,
            noseX,
            noseY,
            mouthX,
            mouthY,
            mouthR,
            mouthAngle,
        );

        document.body.removeChild(div);
    }

    private animateFaceMovement(
        eyeLX: number,
        eyeLY: number,
        eyeRX: number,
        eyeRY: number,
        noseX: number,
        noseY: number,
        mouthX: number,
        mouthY: number,
        mouthR: number,
        mouthAngle: number,
    ) {
        gsap.to(this.svgElements.eyeL, 1, { x: -eyeLX, y: -eyeLY, ease: 'expo.out' });
        gsap.to(this.svgElements.eyeR, 1, { x: -eyeRX, y: -eyeRY, ease: 'expo.out' });
        gsap.to(this.svgElements.nose, 1, {
            x: -noseX,
            y: -noseY,
            rotation: mouthR,
            transformOrigin: 'center center',
            ease: 'expo.out',
        });
        gsap.to(this.svgElements.mouth, 1, {
            x: -mouthX,
            y: -mouthY,
            rotation: mouthR,
            transformOrigin: 'center center',
            ease: 'expo.out',
        });

        // Calculate additional movements
        const chinX = mouthX * 0.8;
        const chinY = mouthY * 0.5;
        let chinS = 1 - (this.dFromC * 0.15) / 100;
        if (chinS > 1) {
            chinS = 1 - (chinS - 1);
            if (chinS < this.chinMin) {
                chinS = this.chinMin;
            }
        }

        const faceX = mouthX * 0.3;
        const faceY = mouthY * 0.4;
        const faceSkew = Math.cos(mouthAngle) * 5;
        const eyebrowSkew = Math.cos(mouthAngle) * 25;
        const outerEarX = Math.cos(mouthAngle) * 4;
        const outerEarY = Math.cos(mouthAngle) * 5;
        const hairX = Math.cos(mouthAngle) * 6;
        const hairS = 1.2;

        gsap.to(this.svgElements.chin, 1, {
            x: -chinX,
            y: -chinY,
            scaleY: chinS,
            ease: 'expo.out',
        });
        gsap.to(this.svgElements.face, 1, {
            x: -faceX,
            y: -faceY,
            skewX: -faceSkew,
            transformOrigin: 'center top',
            ease: 'expo.out',
        });
        gsap.to(this.svgElements.eyebrow, 1, {
            x: -faceX,
            y: -faceY,
            skewX: -eyebrowSkew,
            transformOrigin: 'center top',
            ease: 'expo.out',
        });
        gsap.to(this.svgElements.outerEarL, 1, { x: outerEarX, y: -outerEarY, ease: 'expo.out' });
        gsap.to(this.svgElements.outerEarR, 1, { x: outerEarX, y: outerEarY, ease: 'expo.out' });
        gsap.to(this.svgElements.earHairL, 1, { x: -outerEarX, y: -outerEarY, ease: 'expo.out' });
        gsap.to(this.svgElements.earHairR, 1, { x: -outerEarX, y: outerEarY, ease: 'expo.out' });
        gsap.to(this.svgElements.hair, 1, {
            x: hairX,
            scaleY: hairS,
            transformOrigin: 'center bottom',
            ease: 'expo.out',
        });
    }

    private animateMouthSmall() {
        if (
            this.svgElements.mouthBG &&
            this.svgElements.mouthOutline &&
            this.svgElements.mouthMaskPath
        ) {
            gsap.to(
                [
                    this.svgElements.mouthBG,
                    this.svgElements.mouthOutline,
                    this.svgElements.mouthMaskPath,
                ],
                1,
                {
                    morphSVG: this.svgElements.mouthSmallBG,
                    shapeIndex: 9,
                    ease: 'expo.out',
                },
            );
        }
        gsap.to(this.svgElements.tooth, 1, { x: 0, y: 0, ease: 'expo.out' });
        gsap.to(this.svgElements.tongue, 1, { y: 0, ease: 'expo.out' });
        gsap.to([this.svgElements.eyeL, this.svgElements.eyeR], 1, {
            scaleX: 1,
            scaleY: 1,
            ease: 'expo.out',
        });
        this.eyeScale = 1;
    }

    private animateMouthMedium() {
        if (
            this.svgElements.mouthBG &&
            this.svgElements.mouthOutline &&
            this.svgElements.mouthMaskPath
        ) {
            gsap.to(
                [
                    this.svgElements.mouthBG,
                    this.svgElements.mouthOutline,
                    this.svgElements.mouthMaskPath,
                ],
                1,
                {
                    morphSVG: this.svgElements.mouthMediumBG,
                    shapeIndex: 8,
                    ease: 'expo.out',
                },
            );
        }
        gsap.to(this.svgElements.tooth, 1, { x: 0, y: 0, ease: 'expo.out' });
        gsap.to(this.svgElements.tongue, 1, { x: 0, y: 1, ease: 'expo.out' });
        gsap.to([this.svgElements.eyeL, this.svgElements.eyeR], 1, {
            scaleX: 0.85,
            scaleY: 0.85,
            ease: 'expo.out',
        });
        this.eyeScale = 0.85;
    }

    private animateMouthLarge() {
        if (
            this.svgElements.mouthBG &&
            this.svgElements.mouthOutline &&
            this.svgElements.mouthMaskPath
        ) {
            gsap.to(
                [
                    this.svgElements.mouthBG,
                    this.svgElements.mouthOutline,
                    this.svgElements.mouthMaskPath,
                ],
                1,
                {
                    morphSVG: this.svgElements.mouthLargeBG,
                    ease: 'expo.out',
                },
            );
        }
        gsap.to(this.svgElements.tooth, 1, { x: 3, y: -2, ease: 'expo.out' });
        gsap.to(this.svgElements.tongue, 1, { y: 2, ease: 'expo.out' });
        gsap.to([this.svgElements.eyeL, this.svgElements.eyeR], 1, {
            scaleX: 0.65,
            scaleY: 0.65,
            transformOrigin: 'center center',
            ease: 'expo.out',
        });
        this.eyeScale = 0.65;
    }

    private spreadFingers() {
        if (this.svgElements.twoFingers) {
            gsap.to(this.svgElements.twoFingers, 0.35, {
                transformOrigin: 'bottom left',
                rotation: 30,
                x: -9,
                y: -2,
                ease: 'power2.inOut',
            });
        }
    }

    private closeFingers() {
        if (this.svgElements.twoFingers) {
            gsap.to(this.svgElements.twoFingers, 0.35, {
                transformOrigin: 'bottom left',
                rotation: 0,
                x: 0,
                y: 0,
                ease: 'power2.inOut',
            });
        }
    }

    private coverEyes() {
        gsap.killTweensOf([this.svgElements.armL, this.svgElements.armR]);
        gsap.set([this.svgElements.armL, this.svgElements.armR], { visibility: 'visible' });
        gsap.to(this.svgElements.armL, 0.45, { x: -93, y: 10, rotation: 0, ease: 'quad.out' });
        gsap.to(this.svgElements.armR, 0.45, {
            x: -93,
            y: 10,
            rotation: 0,
            ease: 'quad.out',
            delay: 0.1,
        });
        gsap.to(this.svgElements.bodyBG, 0.45, {
            morphSVG: this.svgElements.bodyBGchanged,
            ease: 'quad.out',
        });
        this.eyesCovered = true;
    }

    private uncoverEyes() {
        gsap.killTweensOf([this.svgElements.armL, this.svgElements.armR]);
        gsap.to(this.svgElements.armL, 1.35, { y: 220, ease: 'quad.out' });
        gsap.to(this.svgElements.armL, 1.35, { rotation: 105, ease: 'quad.out', delay: 0.1 });
        gsap.to(this.svgElements.armR, 1.35, { y: 220, ease: 'quad.out' });
        gsap.to(this.svgElements.armR, 1.35, {
            rotation: -105,
            ease: 'quad.out',
            delay: 0.1,
            onComplete: () => {
                gsap.set([this.svgElements.armL, this.svgElements.armR], { visibility: 'hidden' });
            },
        });
        gsap.to(this.svgElements.bodyBG, 0.45, {
            morphSVG: this.svgElements.bodyBG,
            ease: 'quad.out',
        });
        this.eyesCovered = false;
    }

    private resetFace() {
        gsap.to([this.svgElements.eyeL, this.svgElements.eyeR], 1, {
            x: 0,
            y: 0,
            ease: 'expo.out',
        });
        gsap.to(this.svgElements.nose, 1, { x: 0, y: 0, scaleX: 1, scaleY: 1, ease: 'expo.out' });
        gsap.to(this.svgElements.mouth, 1, { x: 0, y: 0, rotation: 0, ease: 'expo.out' });
        gsap.to(this.svgElements.chin, 1, { x: 0, y: 0, scaleY: 1, ease: 'expo.out' });
        gsap.to([this.svgElements.face, this.svgElements.eyebrow], 1, {
            x: 0,
            y: 0,
            skewX: 0,
            ease: 'expo.out',
        });
        gsap.to(
            [
                this.svgElements.outerEarL,
                this.svgElements.outerEarR,
                this.svgElements.earHairL,
                this.svgElements.earHairR,
                this.svgElements.hair,
            ],
            1,
            {
                x: 0,
                y: 0,
                scaleY: 1,
                ease: 'expo.out',
            },
        );
    }

    private startBlinking(delay?: number) {
        const blinkDelay = delay ? this.getRandomInt(delay) : 1;

        this.blinking = gsap.to([this.svgElements.eyeL, this.svgElements.eyeR], 0.1, {
            delay: blinkDelay,
            scaleY: 0,
            yoyo: true,
            repeat: 1,
            transformOrigin: 'center center',
            onComplete: () => {
                this.startBlinking(12);
            },
        });
    }

    private getRandomInt(max: number): number {
        return Math.floor(Math.random() * Math.floor(max));
    }

    private getAngle(x1: number, y1: number, x2: number, y2: number): number {
        return Math.atan2(y1 - y2, x1 - x2);
    }

    private getPosition(el: HTMLElement): { x: number; y: number } {
        let xPos = 0;
        let yPos = 0;
        let element: HTMLElement | null = el;

        while (element) {
            if (element.tagName === 'BODY') {
                const xScroll = element.scrollLeft || document.documentElement.scrollLeft;
                const yScroll = element.scrollTop || document.documentElement.scrollTop;
                xPos += element.offsetLeft - xScroll + element.clientLeft;
                yPos += element.offsetTop - yScroll + element.clientTop;
            } else {
                xPos += element.offsetLeft - element.scrollLeft + element.clientLeft;
                yPos += element.offsetTop - element.scrollTop + element.clientTop;
            }
            element = element.offsetParent as HTMLElement;
        }

        return { x: xPos, y: yPos };
    }

    private isMobileDevice(): boolean {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
        );
    }

    onSubmit() {
        if (this.loginForm.valid) {
            console.log('Form submitted:', this.loginForm.value);
            // Handle form submission
        }
    }
}
