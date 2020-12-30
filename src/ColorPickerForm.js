import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import useStyles from './styles/ColorPickerFormStyles';
import { withStyles } from '@material-ui/core/styles';

class ColorPickerForm extends Component {
    
    state = {
        currColor : 'teal',
        colorName : '',
    }

    updateColor = newColor => {
        // console.log(newColor.hex);
        this.setState({ currColor : newColor.hex })
    }
    
    handleChange = evt => {
        this.setState({
            colorName: evt.target.value
        })
    }

    handleSubmit = () => {
        const newColor = { 
            color: this.state.currColor, 
            name: this.state.colorName,
        };
        this.props.addColor(newColor);
        this.setState({ colorName : '' });
    }

    componentDidMount() {
        // custom rule will have check if color name is unique
        ValidatorForm.addValidationRule('isColorNameUnique', value =>
            this.props.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );

        // custom rule will have check if color is unique
        ValidatorForm.addValidationRule('isColorUnique', value =>
            this.props.colors.every(
                ({ color }) => color !== this.state.currColor
            )
        )
    }

    render() {

        const { isPaletteFull, classes } = this.props;
        const { currColor, colorName } = this.state;

        return (
            <div className={classes.root}>
                <ChromePicker
                    className={classes.picker}
                    color={currColor}
                    onChangeComplete={newColor => this.updateColor(newColor)} />
                <ValidatorForm
                    className={classes.colorForm}
                    onSubmit={this.handleSubmit}
                // ref="form"
                // onError={errors => console.log(errors)}
                >
                    <TextValidator
                        className={classes.colorNameInput}
                        variant='filled'
                        margin='normal'
                        value={colorName}
                        onChange={this.handleChange}
                        label="New Color Name"
                        name="NewColorName"
                        validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={['enter a color name', 'color name already used', 'color already used']}
                    />
                    <Button
                        className={classes.addColor}
                        type='submit'
                        variant='contained'
                        disabled={isPaletteFull()}
                        style={{ backgroundColor: isPaletteFull() ? 'grey' : currColor }}
                        color='primary'
                    >
                        ADD COLOR
                    </Button>
                </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(useStyles)(ColorPickerForm);
