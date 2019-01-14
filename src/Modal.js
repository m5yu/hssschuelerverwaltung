import React, { Component } from 'react';

class Modal extends Component {
  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 150,
      fontWeight: 'bold',
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      width: 500,
      height: 300,
      margin: '0 auto',
      padding: 30,
    };

    return (
      <div className="backdropCustom" onClick={this.props.onClick} style={backdropStyle}>
        <div className="modalCustom" style={modalStyle}>
          {this.props.student.firstName+' '+this.props.student.lastName} wirklich löschen?
          <div className="footer">
            <button className='btn btn-danger customBtn' onClick={() => this.props.onApprove(this.props.student.id)}>Löschen</button>
            <button className='btn btn-secondary customBtn' onClick={this.props.onClose}>Abbrechen</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;