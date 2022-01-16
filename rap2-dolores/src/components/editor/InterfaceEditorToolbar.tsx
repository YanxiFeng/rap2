import React, { useState } from 'react'
import { Button, makeStyles, Theme, createStyles, Tooltip } from '@material-ui/core'
import LoadingButton from '../common/LoadingButton'
import Create from '@material-ui/icons/Create'
import KeyboardTab from '@material-ui/icons/KeyboardTab'
import Save from '@material-ui/icons/Save'
import Cancel from '@material-ui/icons/Cancel'
import { useSelector } from 'react-redux'
import { RootState } from 'actions/types'
import History from '@material-ui/icons/History'
import HistoryLogDrawer from './HistoryLogDrawer'
import CloudDownload from '@material-ui/icons/CloudDownload'
import { ENTITY_TYPE } from 'utils/consts'
import { serve } from 'relatives/services/constant'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
    iconSmall: {
      fontSize: 20,
    },
  })
)

interface Props {
  auth: any,
  repository: any,
  locker?: any,
  editable: boolean,
  itfId: number,
  moveInterface: any
  handleSaveInterfaceAndProperties: any
  handleUnlockInterface: any
  handleMoveInterface: any
  handleEditInterface: any
}

function InterfaceEditorToolbar(props: Props) {
  const {
    editable,
    locker,
    repository,
    handleEditInterface,
    handleMoveInterface,
    handleSaveInterfaceAndProperties,
    handleUnlockInterface,
    itfId,
  } = props

  const loading = useSelector((state: RootState) => state.loading)
  const [showHistory, setShowHistory] = useState(false)

  const classes = useStyles()
  if (!repository.canUserEdit) { return null }
  if (editable) {
    return (
      <div className="InterfaceEditorToolbar">
        <LoadingButton
          className={classes.button}
          onClick={handleSaveInterfaceAndProperties}
          variant="contained"
          color="primary"
          disabled={loading}
          label="Save"
          size="small"
        >
          <Save className={classes.rightIcon} />
        </LoadingButton>
        <Button
          className={classes.button}
          onClick={handleUnlockInterface}
          variant="contained"
          size="small"
        >
          Cancel
          <Cancel className={classes.rightIcon} />
        </Button>
        <span className="locker-warning hide">This API has been locked！</span>
      </div>
    )
  }
  if (locker) {
    return (
      <div className="InterfaceEditorToolbar">
        <div className="alert alert-danger">当前接口已经被 <span className="nowrap">{locker.fullname}</span> 锁定！</div>
      </div>
    )
  }
  return (
    <div className="InterfaceEditorToolbar">
       <Tooltip title="导出的备份文件，可以导入到其它项目，或本项目">
        <Button
          className={`${classes.button} guide-2`}
          variant="contained"
          onClick={() => window.open(`${serve}/interface/backup/JSONData/${itfId}`)}
          size="small"
        >
          Export
        <CloudDownload className={classes.rightIcon} />
        </Button>
      </Tooltip>
      <Tooltip title="查看该接口中的所有改动历史">
        <Button
          className={`${classes.button} guide-2`}
          variant="contained"
          onClick={() => setShowHistory(true)}
          size="small"
        >
          History
        <History className={classes.rightIcon} />
        </Button>
      </Tooltip>
      <Tooltip title="移动或复制该接口">
        <Button
          className={classes.button}
          onClick={handleMoveInterface}
          variant="contained"
          size="small"
        >
          Move
        <KeyboardTab className={classes.rightIcon} />
        </Button>
      </Tooltip>
      <Tooltip title="点击进入编辑模式，并锁定该接口">
        <LoadingButton
          className={classes.button}
          onClick={handleEditInterface}
          variant="contained"
          color="primary"
          disabled={loading}
          label="Edit"
          size="small"
        >
          <Create className={classes.rightIcon} />
        </LoadingButton>
      </Tooltip>
      <HistoryLogDrawer
        open={showHistory}
        onClose={() => setShowHistory(false)}
        entityId={props.itfId}
        entityType={ENTITY_TYPE.INTERFACE}
      />
    </div>
  )
}

export default InterfaceEditorToolbar
