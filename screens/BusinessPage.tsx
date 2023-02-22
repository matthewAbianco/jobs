import { View, Text, KeyboardAvoidingView, SafeAreaView } from "react-native"
import React from "react"

const BusinessPage = () => {
  return (
    <KeyboardAvoidingView>
      <SafeAreaView>
        {/* Cover Photo Div */}
        <View>
          <View>{/* Cover Photo */}</View>
          <View>
            {/* User/Business Name */}

            {/* Joined Date */}

            {/* Request To Book Button */}

            {/* User profile Image */}

            {/* Star Rating */}

            {/* Junoir Or Senior at positon */}
          </View>
        </View>
        {/* Social Media and Jobs Completed */}
        <View>
          <View>{/* Social Media Links */}</View>
          <View>{/* Jobs Completed */}</View>
        </View>
        <View>
          <View>{/* Bio of business or person */}</View>
          {/* <View> specialities</View>  */}
          {/* <view>Customer review icons</view> */}
        </View>
        {/* Packages and services offered */}
        <View>
          {/* <Text> Services Offered</Text> */}
          <View>{/* Services offered */}</View>
          <View>{/* <View> Logos of companies worked for </View> */}</View>
          {/* User and Business Review */}
          <View>
            <View>{/* User and business review */}</View>
          </View>
          <View>{/* Favourite Location */}</View>
          <View></View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default BusinessPage
