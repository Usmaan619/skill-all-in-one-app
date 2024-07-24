import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';
  import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
  import {dashboardStyle} from '../styles/dashboard.style';
  
  
  CustomDrawerContent = props => {
    return (
      <View style={{flex: 1}}>
        <DrawerContentScrollView {...props}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
                marginVertical: 'auto',
                marginVertical: '5%',
              }}>
              <Image
                style={styles.cardBhaipayImg}
                source={ICONS.bhaiPayImg}
                fadeDuration={0}
              />
              <Image
                style={styles.BhaipayImgText}
                source={ICONS.bhaiPayText}
                fadeDuration={0}
              />
            </TouchableOpacity>
          </View>
          <DrawerItemList {...props} />
          <DrawerItem
            style={{marginBottom: '20%', marginTop: '10%'}}
            label={t('Logout')}
            labelStyle={{fontWeight: '600'}}
            onPress={async () => {
            //   await disconnectAsync();
            //   await Logout(dispatch, props.navigation);
            }}
          />
  
          <View style={styles.powerbyMain}>
            {/* <Text style={{fontSize: 11, margin: 1}}>{t('Poweredby')} </Text> */}
            {/* <Image
              style={styles.bhaiFinnaceImg}
              source={ICONS.bhaiFinanceImg}
              fadeDuration={0}
            /> */}
          </View>
        </DrawerContentScrollView>
      </View>
    );
  };
  
  export default CustomDrawerContent;
  const styles = StyleSheet.create(dashboardStyle);
  