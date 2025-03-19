import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import  EditProfile  from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

const Settings = () => {
  return (
    <div>
        <div>
            <ChangeProfilePicture/>
        </div>

        <div>
          <EditProfile/>
        </div>
        <div>
          <UpdatePassword/>
        </div>
        <DeleteAccount/>
    </div>
  )
}

export default Settings