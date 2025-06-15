import { Fragment, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { useAuth } from '@/hooks/useAuth';
import { EUserRole } from '@/types/user';

import { menus } from '../menus';

type TMenu = {
  path: string;
  label: string;
  icon?: ReactNode;
  child?: TMenu[];
  id: string;
  acceptedRole?: EUserRole[];
};

const HorizontalMenu = ({ color = 'black' }: { color?: 'black' | 'white' }) => {
  const { currentUser } = useAuth();

  const renderMenu = (menu: TMenu) => {
    return (
      <Box
        key={menu.id}
        style={{
          minWidth: '120px',
          textWrap: 'wrap',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <NavLink to={`/${menu.path}`}>
          {({ isActive }) => (
            <Typography
              sx={({ palette }) => ({
                color: isActive
                  ? palette.text.brandPrimary
                  : color === 'black'
                    ? palette.text.primary
                    : palette.neutralLight[0],
                '&:hover': {
                  color:
                    color === 'black' ? palette.text.brandPrimary : undefined,
                  borderBottom:
                    color === 'white'
                      ? `1px solid ${palette.neutralLight[0]}`
                      : undefined,
                },
              })}
              variant="service_bodyB"
            >
              {menu.label}
            </Typography>
          )}
        </NavLink>
      </Box>
    );
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      gap={4}
    >
      {menus.map((menu) => {
        if (!menu.acceptedRole?.length) {
          return renderMenu(menu);
        }

        if (
          menu.acceptedRole?.length &&
          !currentUser?.role &&
          menu.acceptedRole?.includes(EUserRole.GUEST)
        ) {
          return renderMenu(menu);
        }

        if (
          menu.acceptedRole?.length &&
          currentUser?.role &&
          menu.acceptedRole?.includes(currentUser?.role)
        ) {
          return renderMenu(menu);
        }

        return <Fragment key={menu.id} />;
      })}
    </Box>
  );
};

export default HorizontalMenu;
