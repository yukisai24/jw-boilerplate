import { Dispatch, Fragment, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Collapse, MenuItem, styled, Typography } from '@mui/material';

import { useAuth } from '@/hooks/useAuth';
import { EUserRole } from '@/types/user';
import { TMenu } from '../types';
import { menus } from '../menus';

const StyledVerticalMenuItem = styled(MenuItem)(({ theme }) => ({
  width: '100%',
  height: '50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(3),
  padding: 0,
}));

const VerticalMenu = ({
  isDisplay,
  setIsDisplay,
}: {
  isDisplay: boolean;
  setIsDisplay: Dispatch<SetStateAction<boolean>>;
}) => {
  const { currentUser } = useAuth();
  const [focusMenuIdx, setFocusMenuIdx] = useState<number>();
  const navigate = useNavigate();

  const onClickMenuItem = (path?: string) => {
    setIsDisplay((prev) => !prev);
    setFocusMenuIdx(undefined);
    if (path) {
      navigate('/' + path);
    }
  };

  const renderMenu = (menu: TMenu, idx: number) => {
    const hasChild = !!menu?.child?.length;

    return (
      <Fragment key={menu.id}>
        <StyledVerticalMenuItem
          onClick={() => {
            if (hasChild) {
              setFocusMenuIdx((prev) => (prev === idx ? undefined : idx));
              return;
            }
            onClickMenuItem(menu.path);
          }}
        >
          <Typography
            key={menu.id}
            variant="service_body2"
          >
            {menu.label}
          </Typography>

          {hasChild && (
            <Box
              height={10}
              width={10}
              display="flex"
              justifyContent="center"
              alignContent="flex-end"
            >
              {/* <CollapseIcon /> */}
              >
            </Box>
          )}
        </StyledVerticalMenuItem>

        <Collapse in={focusMenuIdx === idx}>
          <Box
            paddingY={3}
            bgcolor={({ palette }) => palette.neutralLight[50]}
          >
            {menu?.child?.map((childMenu) => {
              return (
                <StyledVerticalMenuItem
                  key={childMenu.id}
                  onClick={() =>
                    onClickMenuItem(menu.path + '/' + childMenu.path)
                  }
                >
                  <Typography
                    key={childMenu.id}
                    variant="service_body1"
                  >
                    {childMenu.label}
                  </Typography>
                </StyledVerticalMenuItem>
              );
            })}
          </Box>
        </Collapse>
      </Fragment>
    );
  };

  return (
    <Collapse in={isDisplay}>
      <Box
        bgcolor={({ palette }) => palette.neutralLight[0]}
        width="100%"
      >
        {menus.map((menu, idx) => {
          if (!menu.acceptedRole?.length) {
            return renderMenu(menu, idx);
          }

          if (
            menu.acceptedRole?.length &&
            !currentUser?.role &&
            menu.acceptedRole?.includes(EUserRole.GUEST)
          ) {
            return renderMenu(menu, idx);
          }

          if (
            menu.acceptedRole?.length &&
            currentUser?.role &&
            menu.acceptedRole?.includes(currentUser?.role)
          ) {
            return renderMenu(menu, idx);
          }

          return <Fragment key={menu.id} />;
        })}
      </Box>
    </Collapse>
  );
};

export default VerticalMenu;
