'use client';
import { GrFormClose } from '../../compound/icons/index';

interface INotificationProps {
	stateModalVisible: boolean;
	message: string;
	onClose: () => void;
}

const ModalNotification = ({ stateModalVisible, message, onClose }: INotificationProps) => {
	return (
		<div className={`modal-notification ${stateModalVisible ? '-open-notification' : '-close-notification'}`}>
			<div className="modal-content">
				<p>{message}</p>
				<button
					type="button"
					onClick={onClose}
				>
					<GrFormClose />
				</button>
			</div>
		</div>
	);
};

export default ModalNotification;
