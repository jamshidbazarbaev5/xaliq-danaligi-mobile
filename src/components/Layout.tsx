import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
    children: React.ReactNode;
    style?: any;
}

export const Layout: React.FC<LayoutProps> = ({ children, style }) => {
    const { theme } = useTheme();

    return (
        <SafeAreaView 
            style={[
                styles.container,
                { backgroundColor: theme.backgroundColor },
                style
            ]}
            edges={['right', 'left']}
        >
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default Layout;