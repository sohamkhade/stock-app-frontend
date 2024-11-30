import { Box, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useState } from 'react'
import './TabsComponent.css';
const TabsComponent = () => {
    const [value, setValue] = useState('1')

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }
    return (
        <Box sx={{ width: '100%' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                        onChange={handleChange}
                        aria-label='Tabs example'
                        textColor='primary'
                        indicatorColor='primary'
                        variant='scrollable'
                        allowScrollButtonsMobile
                        scrollButtons={true}>
                        <Tab
                            label='Tab One'
                            value='1'
                        />
                        <Tab label='Tab Two' value='2' />
                        <Tab label='Tab Three' value='3' />
                        <Tab label='Tab Four' value='4' />
                        <Tab label='Tab Five' value='5' />
                        <Tab label='Tab Six' value='6' />
                    </TabList>
                </Box>
                <TabPanel value='1'>Item One</TabPanel>
                <TabPanel value='2'>Item Two</TabPanel>
                <TabPanel value='3'>Item Three</TabPanel>
                <TabPanel value='4'>Item Four</TabPanel>
                <TabPanel value='5'>Item Five</TabPanel>
                <TabPanel value='6'>Item Six</TabPanel>
            </TabContext>
        </Box>
    )
}

export default TabsComponent;