import React, { useState, useEffect } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField'
import { SlideUp } from 'components/common/Transition'
import { Table, TableHead, TableRow, TableCell, TableBody, DialogContent } from '@material-ui/core'
import Delete from '@material-ui/icons/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDefaultVals, updateDefaultVals } from 'actions/repository'
import { withSnackbar, WithSnackbarProps } from 'notistack'

export interface IDefaultVal {
  name: string
  rule: string
  value: string
}

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: spacing(2),
      flex: 1,
    },
    btn: {
      marginBottom: spacing(2),
      marginTop: spacing(2),
    },
    topHint: {
      marginBottom: spacing(2),
      marginTop: spacing(2),
    },
  })
)

function DefaultValueModal({ open, handleClose, repositoryId, enqueueSnackbar }:
  { open: boolean, handleClose: () => void, repositoryId: number } & WithSnackbarProps) {
  const classes = useStyles()
  const [editingData, setEditingData] = useState<IDefaultVal[]>([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchDefaultVals(repositoryId))
  }, [dispatch, repositoryId])
  const defaultVals: IDefaultVal[] = useSelector((state: any) => state.defaultVals)

  useEffect(() => {
    setEditingData(defaultVals)
  }, [defaultVals])

  const addNewLine = () => {
    setEditingData([...editingData, {
      name: '',
      rule: '',
      value: '',
    }])
  }

  const onChange = (key: keyof IDefaultVal, i: number, val: string) => {
    setEditingData(editingData.map((x, j) => {
      if (j === i) {
        return {
          ...x,
          [key]: val,
        }
      }
      return x
    }))
  }

  const onDelete = (i: number) => {
    setEditingData(editingData.filter((_, j) => i !== j))
  }

  const onSubmit = () => {
    dispatch(updateDefaultVals(repositoryId, editingData))
    handleClose()
    enqueueSnackbar(`?????????????????????`, {
      variant: 'success',
      autoHideDuration: 1000,
    })
  }

  return (
    <Dialog fullScreen={true} open={open} onClose={handleClose} TransitionComponent={SlideUp}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>???????????????</Typography>
          <Button color="inherit" onClick={onSubmit}>
            Save
        </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <div className={classes.topHint}>
          <Typography variant="body1"> ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????Mock?????????????????????</Typography>
        </div>
        <div className={classes.btn}>
          <Button onClick={addNewLine} color="primary" variant="contained" size="small">????????????</Button>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>?????????</TableCell>
              <TableCell>????????????</TableCell>
              <TableCell>?????????</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {editingData.map((row, i) => (
              <TableRow key={i}>
                <TableCell scope="row">
                  <TextField
                    value={row.name}
                    onChange={e => onChange('name', i, e.target.value)}
                    placeholder="??????????????????"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row.rule}
                    onChange={e => onChange('rule', i, e.target.value)}
                    placeholder="?????????????????????"
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row.value}
                    onChange={e => onChange('value', i, e.target.value)}
                    placeholder="??????????????????"
                  />
                </TableCell>
                <TableCell>
                  <Delete
                    onClick={() => onDelete(i)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}

export default withSnackbar(DefaultValueModal)
