import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { Box, Typography } from '@mui/material';

import { menus } from '@/components/organisms/mainNavBar/menus';
import { StyledHorizontalMenuItem } from '@/components/organisms/mainNavBar/styled';
import { TMenu } from '@/components/organisms/mainNavBar/types';

import { useAuth } from '@/hooks/useAuth';
import { EUserRole } from '@/types/user';

const HorizontalMenu = ({ color = 'black' }: { color?: 'black' | 'white' }) => {
  const { currentUser } = useAuth();

  // Comment in case need to revert using the dropdown menu
  // This is component's props
  //   {
  //   menuDisplayStatus,
  //   setMenuDisplayStatus,
  // }: {
  //   menuDisplayStatus?: TMenuDisplayStatus;
  //   setMenuDisplayStatus: Dispatch<SetStateAction<TMenuDisplayStatus | undefined>>;
  // }

  // const navigate = useNavigate();
  // const location = useLocation();

  // const handleNavigate = (path?: string) => {
  //   if (path) {
  //     navigate('/' + path);
  //   }
  // };

  const renderMenu = (menu: TMenu) => {
    return (
      <StyledHorizontalMenuItem key={menu.id}>
        <NavLink to={`/${menu.path}`}>
          {({ isActive }) => (
            <Typography
              color={({ palette }) =>
                isActive
                  ? palette.text.brandPrimary
                  : color === 'black'
                    ? palette.text.primary
                    : palette.neutralLight[0]
              }
              sx={({ palette }) => ({
                '&:hover': {
                  color: color === 'black' ? palette.text.brandPrimary : undefined,
                  borderBottom: color === 'white' ? `1px solid ${palette.neutralLight[0]}` : undefined,
                },
              })}
              variant="service_bodyB"
            >
              {menu.label}
            </Typography>
          )}
        </NavLink>
      </StyledHorizontalMenuItem>
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

        if (menu.acceptedRole?.length && !currentUser?.role && menu.acceptedRole?.includes(EUserRole.GUEST)) {
          return renderMenu(menu);
        }

        if (menu.acceptedRole?.length && currentUser?.role && menu.acceptedRole?.includes(currentUser?.role)) {
          return renderMenu(menu);
        }

        return <Fragment key={menu.id} />;
      })}

      {/* Comment in case need to revert using the dropdown menu */}
      {/* {menus.map((menu, idx) => {
        const isFocus = location.pathname.split('/')[1].includes(menu.path);

        return (
          <MenuTooltip
            placement="bottom-start"
            key={menu.id}
            title={
              !menuDisplayStatus?.[menu.id] ? (
                <Box>
                  {menu?.child?.map((child) => {
                    return (
                      <StyledHorizontalMenuItem
                        onClick={() => {
                          handleNavigate(menu.path + '/' + child.path);
                          setMenuDisplayStatus((prev) => ({
                            ...prev,
                            [menu.id]: true,
                          }));
                        }}
                        key={child.id}
                      >
                        <Typography variant="service_body1">{child.label}</Typography>
                      </StyledHorizontalMenuItem>
                    );
                  })}
                </Box>
              ) : null
            }
            disableHoverListener={menuDisplayStatus?.[menu.id] || !menu?.child?.length}
          >
            <MenuItem
              onClick={() => handleNavigate(menu.path)}
              id={`composition-button-${idx}`}
              onMouseEnter={() => {
                setMenuDisplayStatus((prev) => ({
                  ...prev,
                  [menu.id]: false,
                }));
              }}
              sx={{ padding: 0 }}
            >
              <Typography
                aria-haspopup="true"
                minWidth="120px"
                textAlign="center"
                color={({ palette }) => (isFocus ? palette?.text.brandPrimary : palette.text.primary)}
                variant="service_bodyB"
              >
                {menu.label}
              </Typography>
            </MenuItem>
          </MenuTooltip>
        );
      })} */}
    </Box>
  );
};

export default HorizontalMenu;
