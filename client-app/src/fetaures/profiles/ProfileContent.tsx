import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Tab } from 'semantic-ui-react';
import { Profile } from '../../app/layout/models/profile';
import { useStore } from '../../app/layout/stores/store';
import ProfileEditForm from './ProfileEditForm';
// import ProfileAbout from './ProfileAbout';
// import ProfileActivities from './ProfileActivities';
// import ProfileFollowings from './ProfileFollowings';
import ProfilePhotos from './ProfilePhotos';

interface Props {
    profile: Profile;
}

export default observer(function ProfileContent({profile}: Props) {
    const {profileStore} = useStore();
    const[editMode, setEditMode] = useState(false);

    const panes = [
        {menuItem: 'Photos', render: () => <ProfilePhotos profile={profile} />},
        {menuItem: 'Edit Profile', render: () => <ProfileEditForm setEditMode={() => setEditMode(false)} />}
    ];

    return (
        <Tab 
            menu={{fluid: true, vertical: true}}
            menuPosition='right'
            panes={panes}
            onTabChange={(e, data) => profileStore.setActiveTab(data.activeIndex)}
        />
    )
})