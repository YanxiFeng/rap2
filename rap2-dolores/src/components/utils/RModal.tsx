import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import './RModal.css'
import { GoX } from 'react-icons/go'

export const ModalContext = React.createContext<RModal | null>(null)

const customStyle = {
  overlay: {
    background: 'transparent',
  },
  content: {
    border: 'none',
    background: 'transparent',
  },
}

class RModal extends Component<any, any> {
  static propTypes = {
    when: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onResolve: PropTypes.func.isRequired,
  }
  static childContextTypes = {
    rmodal: PropTypes.instanceOf(RModal),
  }
  $rmodal: any
  repositionTimer: any
  static reposition($rmodal: any) {
    if (!$rmodal) { return }
    const left = (document.documentElement.clientWidth - $rmodal.clientWidth) / 2
    const top = (document.documentElement.clientHeight - $rmodal.clientHeight) / 2
    $rmodal.style.left = left + 'px'
    $rmodal.style.top = top + 'px'
  }
  getChildContext() {
    return { rmodal: this }
  }
  render() {
    const { children, when, onClose } = this.props
    if (!when) { return null }
    return (
      <Modal ariaHideApp={false} isOpen={true} onAfterOpen={this.reposition} contentLabel="Modal" style={customStyle}>
        <div className="RModalWrapper">
          <div className="rmodal-backdrop" />
          <div className="RModal" ref={$rmodal => { this.$rmodal = $rmodal }}>
            <ModalContext.Provider value={this}>
              {children}
            </ModalContext.Provider>
            <button type="button" className="close" onClick={() => onClose()}>
              <GoX className="gofont" />
            </button>
          </div>
        </div>
      </Modal>
    )
  }
  componentDidMount() {
    // document.body.classList.add('modal-open')
    document.body.addEventListener('keyup', this.handleEsc)
    window.addEventListener('resize', this.reposition)
    this.reposition()
  }
  componentDidUpdate() {
    this.repositionTimer = null
    this.reposition()
  }
  componentWillUnmount() {
    // document.body.classList.remove('modal-open')
    document.body.removeEventListener('keyup', this.handleEsc)
    window.removeEventListener('resize', this.reposition)
  }
  reposition = () => {
    if (!this.$rmodal) { return }
    // RModal.reposition(this.$rmodal)
    // DONE 2.2 ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
    // ????????????????????????????????????
    if (!this.repositionTimer) {
      RModal.reposition(this.$rmodal) // ????????????????????????????????????
      this.repositionTimer = setTimeout(() => {/** empty */ }) // ???????????? timer?????????????????????????????????
    } else {
      clearTimeout(this.repositionTimer)
      this.repositionTimer = setTimeout(() => {
        RModal.reposition(this.$rmodal)
        this.repositionTimer = null
      }, 100)
    }
  }
  handleEsc = (e: any) => {
    if (e.keyCode === 27) { this.props.onClose() }
  }
  close = () => {
    this.props.onClose()
  }
  resolve = () => {
    this.props.onClose()
    this.props.onResolve()
  }
}

export default RModal
