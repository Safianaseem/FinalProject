import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

// Screens
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import OrderConfirmationScreen from './screens/OrderConfirmationScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileSettingsScreen from './screens/ProfileSettingsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const addOrder = (order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#FDFDFD" />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          animation: 'slide_from_right',
        }}
      >
        {/* Auth Screens */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />

        {/* Main App Screens */}
        <Stack.Screen
          name="Home"
          options={{
            title: 'Home',
            headerShown: false, // Header handled within HomeScreen with profile icon
          }}
        >
          {(props) => (
            <HomeScreen {...props} cartItems={cartItems} setCartItems={setCartItems} />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="ProductDetails"
          options={{ title: 'Product Details' }}
        >
          {(props) => (
            <ProductDetailsScreen
              {...props}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Cart">
          {(props) => (
            <CartScreen {...props} cartItems={cartItems} setCartItems={setCartItems} />
          )}
        </Stack.Screen>

        <Stack.Screen name="Checkout">
          {(props) => (
            <CheckoutScreen
              {...props}
              cartItems={cartItems}
              setCartItems={setCartItems}
              addOrder={addOrder}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="OrderConfirmation"
          component={OrderConfirmationScreen}
          options={{ title: 'Order Confirmation' }}
        />

        <Stack.Screen name="OrderHistory">
          {(props) => <OrderHistoryScreen {...props} orders={orders} />}
        </Stack.Screen>

        <Stack.Screen
          name="Profile"
          component={ProfileSettingsScreen}
          options={{ title: 'Profile Settings' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
