import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { gsap } from 'gsap';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit, OnDestroy {
    @ViewChild('svgContainer') svgContainer!: ElementRef;
    @ViewChild('loginEmailInput') loginEmail!: ElementRef;
    @ViewChild('loginPasswordInput') loginPassword!: ElementRef;
    @ViewChild('loginEmailLabel') loginEmailLabel!: ElementRef;
    @ViewChild('showPasswordCheck') showPasswordCheck!: ElementRef;
    @ViewChild('showPasswordToggleLabel') showPasswordToggle!: ElementRef;


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
        this.loginEmailLabel.nativeElement.parentElement?.classList.add('focusWithText');
        this.onEmailInput(event);
    }

    onEmailBlur(event: any) {
        this.activeElement = null;
        this.emailFocused = false;

        setTimeout(() => {
            if (this.activeElement !== 'email') {
                this.resetFace();
            }
            if (event.target.value == "") {
              this.loginEmailLabel.nativeElement.parentElement?.classList.remove('focusWithText');
            }
        }, 100);
    }

    onEmailInput(event: any) {
        this.calculateFaceMove(event);
        const value = event.target.value;
        this.curEmailIndex = value.length;

        this.loginEmailLabel.nativeElement.parentElement?.classList.add('focusWithText');

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
