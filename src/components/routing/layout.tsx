import { Outlet } from 'react-router-dom'
import { Col, Layout, Row } from 'antd'

import { Header } from '../header'

const {Content} = Layout

const Template = () => {

    return (
        <Layout className="layout">
            <Header/>
            <Content className="layout__wrapper">
                <Row>
                    <Col className="layout__content"
                         xs={{span: 22, offset: 1}}
                         sm={{span: 22, offset: 1}}
                         md={{span: 22, offset: 1}}
                         lg={{span: 22, offset: 1}}
                         xl={{span: 20, offset: 2}}
                         xxl={{span: 16, offset: 4}}
                    >
                        <Outlet/>
                    </Col>
                </Row>
            </Content>
        </Layout>
    )
}

export { Template }