import { View, Text, ScrollView, Dimensions, Image, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteTokens } from '../../utils/funcKeychain'
import { getDataStore, getNameInitials } from '../../utils/funtions';
const { height } = Dimensions.get('window');
const Account = (props) => {
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
        const getInfo = async () => {
            setUserInfo(await getDataStore('logininfo'))
        }
        getInfo();
    }, []);

    const logOut = async () => {
        try {
            await deleteTokens();
            await AsyncStorage.removeItem('logininfo');
            props.navigation.navigate('Login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        !!userInfo && 
        <ScrollView>
            <View style={{ flex: 1 }}>
                <View style={{
                    height: Platform.OS == 'ios' ? 250 : 265,
                    backgroundColor: '#F46138',
                }}>
                    <View style={{
                        alignItems: 'flex-end',
                        marginRight: 15,
                        marginTop: 70,
                        marginBottom: 25,
                    }}>
                        <TouchableOpacity style={{
                            borderRadius: 30,
                            backgroundColor: '#fff',
                            paddingVertical: 4,
                            paddingHorizontal: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }} onPress={logOut}>
                            <Text style={{
                                color: '#ff5454'
                            }}
                            >Thoát</Text>
                            <Image
                                source={require('../../../assets/logout.png')}
                                resizeMode='contain'
                                style={{
                                    width: 12,
                                    height: 12,
                                    tintColor: '#ff5454'
                                }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}>
                        {
                            userInfo.thumbnail ?
                                <Image
                                    source={{ uri: userInfo.thumbnail }}
                                    resizeMode='contain'
                                    style={{
                                        width: 70,
                                        height: 70,
                                        borderRadius: 50,
                                        borderWidth: 3,
                                        borderColor: '#fff'
                                    }}
                                />
                                :
                                <View style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: 50,
                                    borderWidth: 3,
                                    borderColor: '#fff',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>{getNameInitials(userInfo.fullname)}</Text>
                                </View>
                        }
                        <Text style={{ fontSize: 12, marginTop: 10, color: '#fff' }}>Xin chào!</Text>
                        <Text style={{ fontSize: 20, marginTop: 5, color: '#fff' }}>{userInfo.fullname}</Text>
                    </View>
                </View>
                <View
                    style={{
                        backgroundColor: '#fff',
                        padding: 15,
                        gap: 20
                    }}
                >
                    <Text style={{
                        fontSize: 19,
                    }}>Tài khoản</Text>
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15 }}>
                            <Image
                                source={require('../../../assets/9024845_user_circle_light_icon.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: 'gray'
                                }}
                            />
                            <Text style={{ fontSize: 16, color: 'gray' }}>Thiết lập thông tin cá nhân</Text>
                        </View>
                        <Image
                            source={require('../../../assets/nextIcon.png')}
                            resizeMode='contain'
                            style={{
                                width: 20,
                                height: 20,
                            }}
                        />
                    </TouchableOpacity>
                    <View style={{
                        height: 1,
                        backgroundColor: '#f2efef',
                    }} />
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15 }}>
                            <Image
                                source={require('../../../assets/payment.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: 'gray'
                                }}
                            />
                            <Text style={{ fontSize: 16, color: 'gray' }}>Tài khoản thanh toán</Text>
                        </View>
                        <Image
                            source={require('../../../assets/nextIcon.png')}
                            resizeMode='contain'
                            style={{
                                width: 20,
                                height: 20,
                            }}
                        />
                    </TouchableOpacity>
                    <View style={{
                        height: 1,
                        backgroundColor: '#f2efef',
                    }} />
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15 }}>
                            <Image
                                source={require('../../../assets/5820397_award_prize_rating_reward_stars_icon.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: 'gray'
                                }}
                            />
                            <Text style={{ fontSize: 16, color: 'gray' }}>Thông tin điểm thưởng</Text>
                        </View>
                        <Image
                            source={require('../../../assets/nextIcon.png')}
                            resizeMode='contain'
                            style={{
                                width: 20,
                                height: 20,
                            }}
                        />
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        backgroundColor: '#fff',
                        marginTop: 5,
                        padding: 15,
                        gap: 20
                    }}
                >
                    <Text style={{
                        fontSize: 19,
                    }}>Cài đặt</Text>
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15 }}>
                            <Image
                                source={require('../../../assets/211693_bell_icon.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: 'gray'
                                }}
                            />
                            <Text style={{ fontSize: 16, color: 'gray' }}>Thông báo</Text>
                        </View>
                        <Image
                            source={require('../../../assets/nextIcon.png')}
                            resizeMode='contain'
                            style={{
                                width: 20,
                                height: 20,
                            }}
                        />
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        backgroundColor: '#fff',
                        marginTop: 5,
                        padding: 15,
                        gap: 20,
                        marginBottom: 85
                    }}
                >
                    <Text style={{
                        fontSize: 19,
                    }}>Khác</Text>
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15 }}>
                            <Image
                                source={require('../../../assets/9045158_review_icon.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: 'gray'
                                }}
                            />
                            <Text style={{ fontSize: 16, color: 'gray' }}>Đánh giá sản phẩm</Text>
                        </View>
                        <Image
                            source={require('../../../assets/nextIcon.png')}
                            resizeMode='contain'
                            style={{
                                width: 20,
                                height: 20,
                            }}
                        />
                    </TouchableOpacity>
                    <View style={{
                        height: 1,
                        backgroundColor: '#f2efef',
                    }} />
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15 }}>
                            <Image
                                source={require('../../../assets/guaranty.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: 'gray'
                                }}
                            />
                            <Text style={{ fontSize: 16, color: 'gray' }}>Trung tâm bảo hành</Text>
                        </View>
                        <Image
                            source={require('../../../assets/nextIcon.png')}
                            resizeMode='contain'
                            style={{
                                width: 20,
                                height: 20,
                            }}
                        />
                    </TouchableOpacity>
                    <View style={{
                        height: 1,
                        backgroundColor: '#f2efef',
                    }} />
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15 }}>
                            <Image
                                source={require('../../../assets/feedback.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: 'gray'
                                }}
                            />
                            <Text style={{ fontSize: 16, color: 'gray' }}>Phản ánh khiếu nại</Text>
                        </View>
                        <Image
                            source={require('../../../assets/nextIcon.png')}
                            resizeMode='contain'
                            style={{
                                width: 20,
                                height: 20,
                            }}
                        />
                    </TouchableOpacity>
                    <View style={{
                        height: 1,
                        backgroundColor: '#f2efef',
                    }} />
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15 }}>
                            <Image
                                source={require('../../../assets/3643739_forward_next_right_share_turn_icon.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: 'gray'
                                }}
                            />
                            <Text style={{ fontSize: 16, color: 'gray' }}>Giới thiệu bạn bè</Text>
                        </View>
                        <Image
                            source={require('../../../assets/nextIcon.png')}
                            resizeMode='contain'
                            style={{
                                width: 20,
                                height: 20,
                            }}
                        />
                    </TouchableOpacity>
                    <View style={{
                        height: 1,
                        backgroundColor: '#f2efef',
                    }} />
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15 }}>
                            <Image
                                source={require('../../../assets/suport.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: 'gray'
                                }}
                            />
                            <Text style={{ fontSize: 16, color: 'gray' }}>Trung tâm hỗ trợ</Text>
                        </View>
                        <Image
                            source={require('../../../assets/nextIcon.png')}
                            resizeMode='contain'
                            style={{
                                width: 20,
                                height: 20,
                            }}
                        />
                    </TouchableOpacity>
                    <View style={{
                        height: 1,
                        backgroundColor: '#f2efef',
                    }} />
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15 }}>
                            <Image
                                source={require('../../../assets/3643768_info_information_letter_mark_sign_icon.png')}
                                resizeMode='contain'
                                style={{
                                    width: 25,
                                    height: 25,
                                    tintColor: 'gray'
                                }}
                            />
                            <Text style={{ fontSize: 16, color: 'gray' }}>Thông tin ứng dụng</Text>
                        </View>
                        <Image
                            source={require('../../../assets/nextIcon.png')}
                            resizeMode='contain'
                            style={{
                                width: 20,
                                height: 20,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default Account