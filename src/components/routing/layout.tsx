import { Outlet } from 'react-router-dom'
import { Col, Layout, Row } from 'antd'

import { Header } from '../header'

const {Content} = Layout

const Template = () => {

    return (
        <Layout style={{height: '100%'}}>
            <Header/>
            <Content style={{padding: '60px 50px', height: '100%'}}>
                <Row style={{background: 'white', padding: '30px', height: '100%'}}>
                    <Col span={20} offset={1}>
                        <Outlet/>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}

export { Template }