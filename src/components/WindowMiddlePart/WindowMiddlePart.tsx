import React, { useRef } from 'react';
import { default as cssBemModules } from 'bem-css-modules';
import { WindowMiddlePartProps } from './interfaces/WindowMiddlePartProps';
import { default as WindowMiddlePartStyles } from './WindowMiddlePart.module.scss';
import { WindowLeftEdge } from '../WindowLeftEdge/WindowLeftEdge';
import { WindowRightEdge } from '../WindowRightEdge/WindowRightEdge';

const style = cssBemModules(WindowMiddlePartStyles);


export const WindowMiddlePart: React.FC<WindowMiddlePartProps> = (props) => {
	

	return (
		<div className={style()} onWheel={props.wheelScroll}>
			<WindowLeftEdge isActive={props.isActive} />
			<div className={style('border')}>
				<div className={style('content')} ref={props.contentReference} style={{transform: 'translate(10px, 5px)'}}>
					{props.content}
				</div>
			</div>
			<WindowRightEdge 
				isActive={props.isActive}
				scrollDown={props.scrollDown}
				scrollUp={props.scrollUp}
			/>
		</div>
	);
};
