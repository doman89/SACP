/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { WindowContext } from './WindowContext';
import { WithWindowContext } from './interfaces/WithWindowContext';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export const withWindowContext = <P extends object>(Component: React.ComponentType<P>): React.FC<Omit<P, keyof WithWindowContext>> =>
	(props) => (
		<WindowContext.Consumer>
			{state => <Component {...props as P} context={{...state}} />}
		</WindowContext.Consumer>
	);
