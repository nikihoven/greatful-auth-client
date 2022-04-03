import { Col, Layout, Row } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'

import { Header } from '../header'

const Template = () => {

    return (
        <Layout style={{height: '100%'}}>
            <Header/>
            <Content style={{padding: '60px 50px', height: '100%'}}>
                <Row style={{background: 'white', height: '100%'}}>
                    <Col>
                        <Outlet/>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}

export { Template }