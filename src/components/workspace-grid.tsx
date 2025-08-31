"use client";
import React from 'react';
import { Col, ColProps } from 'antd'; 

export default function GridWorkspace({ children, ...props }: ColProps) {
  return (
    <Col {...props}>
      {children}
    </Col>
  );
}