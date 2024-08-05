import type { TransitionDirectionalAnimations } from '../@types/astro.js';
export { createAnimationScope } from '../runtime/server/transition.js';
export declare function slide({ duration, }?: {
    duration?: string | number;
}): TransitionDirectionalAnimations;
export declare function fade({ duration, }?: {
    duration?: string | number;
}): TransitionDirectionalAnimations;
