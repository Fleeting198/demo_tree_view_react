import React from "react";
import style from './editableLabel.module.css'
interface Props {
    text: string
    onChange: (val: string) => void
}
interface State {
    editing: boolean
}
export default class EditableLabel extends React.Component<Props, State>{
    refInput: any;

    constructor(props: Props) {
        super(props)
        this.state = {
            editing: false,
        }
        this.refInput = React.createRef()
        this.toggle = this.toggle.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.onKeyDown = this.onKeyDown.bind(this)
    }

    componentDidMount() {
        window.addEventListener('keydown', this.onKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown)
    }

    componentDidUpdate() {
        if (this.state.editing) {
            this.refInput.current.focus()
        }
    }

    onKeyDown(e: KeyboardEvent) {
        let { editing } = this.state
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && editing) {
                this.endEdit()
            }
        })
    }

    startEdit() {
        this.setState({
            editing: true
        })
    }
    endEdit() {
        this.setState({
            editing: false
        })

    }

    handleInputChange(e: any) {
        this.props.onChange(e.target.value)
    }

    toggle() {
        this.setState({
            editing: !this.state.editing
        })
    }

    render() {
        const { text } = this.props
        let contentComponent =
            this.state.editing ?
                (<input className={style.input}
                    type="text" value={text}
                    onChange={this.handleInputChange}
                    onBlur={this.toggle}
                    ref={this.refInput}
                />)
                :
                (<span className={style.text}
                // onDoubleClick={() => this.startEdit()}
                > {text}</span>)

        return (
            <div className={style.editableLabel} >
                {contentComponent}
                <span className="itemAction" onClick={this.toggle}> [ e ] </span>
            </div>
        )
    }
}