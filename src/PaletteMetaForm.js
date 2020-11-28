import React, { useState, useEffect }  from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


export default function PaletteMetaForm(props) {
    const [open, setOpen] = React.useState(props.formShowing);
    const [paletteName, setPaletteName] = useState('');

    const { handleSubmit, palettes} = props;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                <ValidatorForm
                    onSubmit={() => handleSubmit(paletteName)}
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
                        <Button onClick={handleClose} color="primary">
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

