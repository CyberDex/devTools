import ls from 'localstorage-slim';
import type { Application } from '@pixi/app';
import { UPDATE_PRIORITY } from '@pixi/ticker';
import { type StatsJSAdapter, addStats } from 'pixi-stats';

type Styles = {
    [key: string]: string;
};

const offsets = {
    x: 50,
    y: 30,
};
const defaultScale = 0.5;
const defaultStyles: Styles = {
    position: 'fixed',
    left: `-${offsets.x}px`,
    bottom: `-${offsets.y}px`,
    opacity: '0.8',
    'user-select': ' none',
    scale: `${defaultScale}`,
    userSelect: 'none',
};

export class PixiStats {
    private stats: StatsJSAdapter;
    private element!: HTMLElement;

    constructor(pixi: Application) {
        this.stats = addStats(document, pixi);

        pixi.ticker.add(this.stats.update, this.stats, UPDATE_PRIORITY.UTILITY);

        const element = document.getElementById('stats');

        if (element) {
            this.element = element;
        }

        this.stats.stats.domElement.addEventListener('pointerup', () => {
            setTimeout(() => {
                ls.set('stats-mode', this.stats.stats.mode);
            }, 10);
        });

        this.stats.stats.setMode(ls.get('stats-mode') ?? 0);

        this.setStyles(defaultStyles);
        this.stats.stats.domElement.style.zIndex = '1000';
    }

    setStyles(styles: Styles) {
        if (!this.element) {
            console.error('Stats element not found');

            return;
        }

        for (const style in styles) {
            this.element.style.setProperty(style, styles[style]);
        }
    }

    remove() {
        if (!this.element) {
            console.error('Stats element not found');

            return;
        }

        this.element.remove();
    }
}
