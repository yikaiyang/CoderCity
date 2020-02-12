import { Store } from '@ngrx/store';
import { Commit } from 'src/app/shared/git/commit.model';
import { State } from 'src/app/reducers';
import { Svg } from '@svgdotjs/svg.js';
import * as GitActions from '../../git.action';
import { AbstractGraphCommit } from './abstract-graph-commit';
import { getBranchColor, getBranchHighlightColor } from '../graph-colors';
import {  computeMergeCommitCirclePosition, GridPosition } from '../compute-position';

export const MERGE_CIRCLE_WIDTH = 10;
export const CIRCLE_COLOR = '#0AB6B9';

export class GraphMergeCommit extends AbstractGraphCommit {
    private highlightColor: string;

    constructor(
        public store: Store<State>,
        public readonly gridPosition: GridPosition,
        public commit: Commit,
        public color: string = CIRCLE_COLOR
    ) {
        super(store);
        if (gridPosition.x < 0 && gridPosition.y < 0) {
            console.error(`GraphMergeCommit: Invalid parameters graphPosition are null or undefined`);
            return;
        }
        this.color = getBranchColor(this.gridPosition.y);
        this.highlightColor = getBranchHighlightColor(this.gridPosition.y);

        const pixelCoordinates = computeMergeCommitCirclePosition({ x: gridPosition.x, y: gridPosition.y});
        this.x = pixelCoordinates.x;
        this.y = pixelCoordinates.y;
        this.graphPositionX = this.gridPosition.x;
        this.graphPositionY = this.gridPosition.y;
    }

    render(svg: Svg) {
        const circle = svg
            .circle(MERGE_CIRCLE_WIDTH)
            .fill(
                this.color
            )
            .on('mouseover', () => {
                this.store.dispatch(
                    GitActions.setCommitPreview(
                        {
                            commitPreview: this.commit
                        }
                    )
                );
                circle
                    .stroke({ width: 4, color: this.highlightColor });
              })
            .on('mouseout', () => {
                circle
                    .fill({ color: this.color})
                    .stroke({ width: 0 });
            })
            .move(this.x, this.y + MERGE_CIRCLE_WIDTH / 2);
    }
}
