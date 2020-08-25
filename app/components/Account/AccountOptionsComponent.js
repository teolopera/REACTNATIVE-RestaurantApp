import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { map } from 'lodash';

/* Components */
import { ModalComponent } from '../ModalComponent';
import { ChangeDisplayNameForm } from './ChangeDisplayNameForm';
import { ChangeEmailForm } from './ChangeEmailForm';

export const AccountOptionsComponent = (props) => {

    const { userInfo, toastRef, setReloadUserInfo } = props;

    const [showModal, setShowModal] = useState(false);

    const [renderComponent, setRenderComponent] = useState(null)

    const selectedComponent = (key) => {
        
        switch (key) {

            case 'displayName':
                setRenderComponent(
                    <ChangeDisplayNameForm 
                        displayName={userInfo.displayName}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUserInfo={setReloadUserInfo}
                    />);
                setShowModal(true);
                break;
            
            case 'email':
                setRenderComponent(
                    <ChangeEmailForm 
                        email={userInfo.email}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUserInfo={setReloadUserInfo}
                    />)
                setShowModal(true);
                break;

            case 'password':
                setRenderComponent(<Text>Cambiando password</Text>)
                setShowModal(true);
                break;

            default:
                setRenderComponent(null);
                setShowModal(false);
                break;
        }

    }

    const menuOptions = generateOptions(selectedComponent);

    return (
        <View>
            {
                map(menuOptions, (menu, index) => (
                    <ListItem 
                        key={index}
                        title={menu.title}
                        leftIcon={{
                            type: menu.iconType,
                            name: menu.iconNameLeft,
                            color: menu.iconColorLeft
                        }}
                        rightIcon={{
                            type: menu.iconType,
                            name: menu.iconNameRight,
                            color: menu.iconColorRight
                         }}
                        onPress={menu.onPress}
                        containerStyle={styles.menuItem}
                    />
                ))
            }

            {renderComponent && (
                <ModalComponent isVisible={showModal} setIsVisible={setShowModal}>
                    {renderComponent}
                </ModalComponent>
            )}
        </View>
    )
}

const generateOptions = (selectedComponent) => {
    return [
        {
            title: 'Cambiar nombre y apellidos',
            iconType: 'material-community',
            iconNameLeft:  'account-circle',
            iconColorLeft: '#ccc',
            iconNameRight: 'chevron-right',
            iconColorRight: '#ccc',
            onPress: () => selectedComponent('displayName')
        },
        {
            title: 'Cambiar Email',
            iconType: 'material-community',
            iconNameLeft:  'at',
            iconColorLeft: '#ccc',
            iconNameRight: 'chevron-right',
            iconColorRight: '#ccc',
            onPress: () => selectedComponent('email')
        },
        {
            title: 'Cambiar contraseña',
            iconType: 'material-community',
            iconNameLeft:  'lock-reset',
            iconColorLeft: '#ccc',
            iconNameRight: 'chevron-right',
            iconColorRight: '#ccc',
            onPress: () => selectedComponent('password')
        }
    ]
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3'
    }
})