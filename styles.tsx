import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    topView: {
        height: '100%',
        flex: 1,
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 20,
        padding: 20,
        overflow: 'hidden',
    },
    coreView: {
        backgroundColor: '#fff',
        flex: 1,
    },
    title: {
        alignSelf: 'center',
        margin: 10,
        color: '#000',
    },
    section: {
        borderRightWidth: 5,
        borderColor: '#369'
    },
    header: {
        fontSize: 20,
        marginBottom: 10,
        borderBottomWidth: 0,
        borderColor: '#bbb'
    },
    socialMediaRow: {
        flexDirection: 'row',
        height: 40,
    },
    socialMediaButton: {
        borderRadius: 5,
        borderWidth: 1,
        marginLeft: 2,
        marginRight: 2,
        borderColor: '#bbb',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    socialMediaButtonDisabled: {
        backgroundColor: '#888',
    },
    socialMediaLogo: {
        resizeMode:'contain',
        height: 20,
        width: 20,
    },
    primaryTouchable: {
        width: '100%',
        borderRadius: 5,
        borderColor: '#bbb',
        backgroundColor: '#296cb1',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    },
    secondaryTouchable: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#bbb',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    },
    disabledTouchable: {
        borderRadius: 5,
        borderWidth: 0,
        borderColor: '#bbb',
        backgroundColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
    },
    primaryTouchableText: {
        fontSize: 20,
        color: '#fff',
    },
    secondaryTouchableText: {
        fontSize: 20,
        color: '#296cb1',
    },
    disabledTouchableText: {
        fontSize: 20,
        color: '#888',
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#000',
        padding: 0,
        marginBottom: 10,
    },
    singleInput: {
        width: 20,
        margin: 5,
        fontSize: 20,
        fontVariant: ["tabular-nums"],
        textAlign: 'center',
    },
    hrView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    hr: {
        margin: 20,
        flex: 1,
        height: 0,
        borderTopWidth: 1,
        borderColor: '#888',
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
    spinnerView: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 100,
        backgroundColor: 'rgba(255,255,255,0.85)',
    },
    spinnerImage: {
        height: 40,
        width: 40,
        zIndex: 200,
    },

    /* QR Scanner */
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777'
    },
    textBold: {
      fontWeight: '500',
      color: '#000'
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
      padding: 16
    },

    /* Status Footer */
    footerView: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerImage: {
        width: 40,
        height: 40,
    },

    /* Google login account info */
    googleAccountWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        padding: 5,
        borderRadius: 5,
    },
    googleAccountInner: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        overflow: 'hidden',
    },
    googleName: {
        fontSize: 16,
        color: '#000'
    },
    googleEmail: {
        fontSize: 12
    },
    googleAccountImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 5,
    },
    googleSignoutButton: {
        backgroundColor: '#296cb1',
        color: '#fff',
        padding: 5,
        borderRadius: 5,
    },

    /* Player Tag */
    tagView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderRadius: 1000,
        alignSelf: 'flex-start',
        padding: 5,
    },
    tagText: {
        color: '#444',
        paddingLeft: 10,
        paddingRight: 10,
    },
    tagImage: {
        borderRadius: 25,
        width: 25,
        height: 25,
    },
    tagPencil: {
        width: 15,
        height: 15,
        marginRight: 10,
    }

})

export { styles }