import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css'

const Backdrop = (props) => {
	return (
			<div className={classes.backdrop}
			>
			</div>
	)
}

const ModalOverlay = (props) => {
	return (
			<div className={classes.modal}>
				<div className={classes.content}>{props.children}</div>
				{/*모달이 사용되는 컴포넌트에서 모달 열기 태그와 닫기 태그 사이로 실제 전달된 컨텐츠*/}
			</div>
	)
}

const Modal = (props) => {
	const portalElement = document.getElementById('overlay_root');
	return (
			<React.Fragment>
				{ReactDOM.createPortal(
						<Backdrop/>,
						portalElement)}
				{ReactDOM.createPortal(
						<ModalOverlay>
							{props.children}
						</ModalOverlay>,
						portalElement)}
			</React.Fragment>
	)
}
export default Modal;