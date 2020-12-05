import React, { useState, useEffect }  from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart';

export default function PaletteMetaForm(props) {
    const [stage, setStage] = React.useState('form');
    const [paletteName, setPaletteName] = useState('');

    const { handleSubmit, palettes, handleClickClose } = props;

    const handlePaletteNameChange = evt => {
        setPaletteName(evt.target.value)
    }

    useEffect(() => {
        // custom rule will have check if palette name is unique
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
            palettes.every(
                ({ id }) => id !== paletteName.toLowerCase().replace(/ /g, '-')
            )
        )
    })

    const showEmoji = () => {
        setStage('emoji');
    }

    const savePalette = emoji => {
        // console.log(emoji.native);
        const palette = {
            paletteName: paletteName,
            emoji: emoji.native,
        }
        handleSubmit(palette);
    }

    return (

        <div>
            <Dialog open={stage === 'emoji'} onClose={handleClickClose}>
                <DialogTitle>Choose a Palette Emoji</DialogTitle>
                <Picker title='Pick a emoji' onSelect={savePalette} />
            </Dialog>
            <Dialog open={stage === 'form'} onClose={handleClickClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                <ValidatorForm
                    onSubmit={showEmoji}
                >
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your newly created beautiful palette. It would have to a unique one!
                        </DialogContentText>
                            <TextValidator
                                label='Palette Name'
                                name='newPaletteName'
                                value={paletteName}
                                onChange={handlePaletteNameChange}
                                fullWidth
                                margin='normal'
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={['Enter a palette name', 'Palette name already used']}
                            />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClickClose} color="primary">
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            variant='contained'
                            color='primary'>Save Palette</Button
                        >
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
    );
}

